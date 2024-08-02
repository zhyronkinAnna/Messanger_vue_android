import { IRequest, IRespond } from '../models';
import { WebSocketService } from '../services/websocket';

export async function handleRequest(wsService: WebSocketService, request: IRequest): Promise<IRespond | null> {
    let response: IRespond | null = null;

    try {
        response = await wsService.send(request);
    } catch (e) {
        if (e instanceof Error) {
            response!.errorMessage = e.message || "An error occurred";
        } else {
            response!.errorMessage = "An unknown error occurred";
        }
    }
    finally {
        return response;
    }
}
