import { WebSocketService } from './websocket';
import { useStore } from '../stores/store';

let wsService: WebSocketService | null = null;

export async function initializeWebSocketService(store: ReturnType<typeof useStore>) {
    if (!wsService) {
        wsService = new WebSocketService("ws://localhost:8000/echo", store);
        await wsService.connect();
    }
}

export function useWsService(): WebSocketService | null {
    return wsService;
}
