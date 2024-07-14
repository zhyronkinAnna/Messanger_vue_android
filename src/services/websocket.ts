import { useStore } from '../stores/store';  // путь до вашего store

class WebSocketService {
    private ws: WebSocket | null = null;
    private url: string;
    private responseResolvers: { [key: string]: (value: any) => void } = {};
    private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    private store: ReturnType<typeof useStore>;

    constructor(url: string, store: ReturnType<typeof useStore>, private reconnectInterval: number = 5000) {
        this.url = url;
        this.store = store;
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);
    
            this.ws.onopen = () => {
                console.log('Connected to the server');
                this.store.isConected = true;
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
                console.log('Disconnected from the server');
                this.store.isConected = false;
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
            console.log('Attempting to reconnect...');
            await this.connect();
        }, this.reconnectInterval);
    }

    send(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const requestId = Date.now().toString();
            this.responseResolvers[requestId] = resolve;
            const command = "SignIn";
    
            const message = {
                requestId,
                data,
                command,
            };
    
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                console.log('Sending message:', message);
                this.ws.send(JSON.stringify(message));
            } else {
                reject('WebSocket is not open');
            }
        });
    }
    

    private handleMessage(data: any) {
        console.log('Received message from server:', data);
        let parsedData;
        try {
            parsedData = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return;
        }

        const { requestId, response } = parsedData;

        if (requestId && this.responseResolvers[requestId]) {
            console.log('Resolving response for requestId:', requestId, 'with response:', response);
            this.responseResolvers[requestId](response);
            delete this.responseResolvers[requestId];
        } else {
            console.log('No resolver found for requestId:', requestId);
        }
    }

    close(): void {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export { WebSocketService };
