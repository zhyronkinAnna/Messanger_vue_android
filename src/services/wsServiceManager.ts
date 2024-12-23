import { WebSocketService } from './websocket';
import { useStore } from '../stores/store';

let wsService: WebSocketService | null = null;

export async function initializeWebSocketService(store: ReturnType<typeof useStore>) {
    if (!wsService) {
        wsService = new WebSocketService("ws://10.0.2.2:8000/echo", store); //TODO: "ws://10.0.2.2:8000/echo"  or "ws://localhost:8000/echo"
        await wsService.connect();
    }
}

export function useWsService(): WebSocketService | null {
    return wsService;
}
