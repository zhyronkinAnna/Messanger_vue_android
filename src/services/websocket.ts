import { MessageTypeEnum, IMessage, IRequest, IResponse, INotification,  } from '../models';
import { handleNotification } from '../models/INotification';
import { useStore } from '../stores/store';

class WebSocketService {
    private ws: WebSocket | null = null;
    private url: string;
    private responseResolvers: { [key: string]: (value: IResponse) => void } = {};
    private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    private store: ReturnType<typeof useStore>;

    constructor(url: string, store: ReturnType<typeof useStore>, private reconnectInterval: number = 15000) {
        this.url = url;
        this.store = store;
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);

            this.ws.onopen = () => {
                this.store.isConnected = true;
                if (this.reconnectTimeout) {
                    clearTimeout(this.reconnectTimeout);
                    this.reconnectTimeout = null;
                }
                resolve();
            };

            this.ws.onmessage = (event) => {
                this.handleMessage(event.data);
            };

            this.ws.onclose = () => {
                this.store.isConnected = false;
                this.scheduleReconnect();
            };

            this.ws.onerror = (err) => {
                console.error('WebSocket error:', err);
                reject(err);
            };
        });
    }
    

    private scheduleReconnect(): void {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
        this.reconnectTimeout = setTimeout(async () => {
            await this.connect();
        }, this.reconnectInterval);
    }

    send(data: IRequest, waitForRequest: boolean): Promise<IResponse | null> {
        if (waitForRequest) {
            return new Promise((resolve, reject) => {
                const requestId = Date.now().toString();
                this.responseResolvers[requestId] = resolve;
                data.requestId = requestId;
    
                if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                    this.ws.send(JSON.stringify(data));
                } else {
                    reject('WebSocket is not open');
                }
            });
        } else {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                console.log('Sending message:', data);
                this.ws.send(JSON.stringify(data));
            } else {
                console.error('WebSocket is not open');
            }
            return Promise.resolve(null);
        }
    }

    private handleMessage(data: any) {        
        let message: IMessage;
        try {
            message = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return;
        }


        if (message?.type === MessageTypeEnum.Response) {
            let respond: IResponse;
            respond = JSON.parse(data);
            
            if (respond.requestId && this.responseResolvers[respond.requestId]) {
                this.responseResolvers[respond.requestId](respond);
                delete this.responseResolvers[respond.requestId];
            } else {
            }
        }
        else if (message?.type === MessageTypeEnum.Notification) {
            let notification: INotification;
            notification = JSON.parse(data);
            handleNotification(notification);
        }
    }

    close(): void {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export { WebSocketService };
