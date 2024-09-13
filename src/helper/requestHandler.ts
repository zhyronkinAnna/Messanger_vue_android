import { IRequest, IResponse } from '../models';
import { WebSocketService } from '../services/websocket';

export async function handleRequest(wsService: WebSocketService, request: IRequest, waitForRequest: boolean = true): Promise<IResponse | null> {
    let response: IResponse | null = null;
    
    try {
        response = await wsService.send(request, waitForRequest);
    } catch (e) {
        if (e instanceof Error) {
            response!.errorMessage = e.message || "An error occurred";
        } else {
            response!.errorMessage = "An unknown error occurred";
        }
    }
    finally {
        debugger
        return response;
    }
}
