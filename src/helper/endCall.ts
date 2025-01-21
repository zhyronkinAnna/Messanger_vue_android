import { CallSignalTypeEnum, IPrivateChat, IRequest, NotificationTypes } from "../models";
import { WebSocketService } from "../services/websocket";
import { handleRequest } from "./requestHandler";

/**
 * Ends the current call and optionally sends a request to the receiver.
 * @param store - The application state store.
 * @param wsService - The WebSocket service instance.
 * @param sendRequest - Whether to send a request to the receiver.
 */
export function endCallAndSendRequestToReceiver(store: any, wsService: WebSocketService | null, sendRequest: boolean = true): void {
    if (store.peerConnection) {
        // Stop all media tracks and close the peer connection
        store.peerConnection.getSenders().forEach((sender: RTCRtpSender) => {
            if (sender.track) sender.track.stop();
        });

        store.peerConnection.close();
        store.peerConnection = null;

        // Remove the audio element from the DOM if it exists
        const audioElement = document.querySelector("audio");
        if (audioElement) {
            audioElement.pause();
            audioElement.srcObject = null;
            document.body.removeChild(audioElement);
        }

        console.debug("Connection is closed.");
    }

    if (sendRequest) {
        // Create the end call request payload
        const endCallRequest: IRequest = {
            command: "HandleCall",
            data: {
                TargetUserId: (store.selectedChat as IPrivateChat)?.user.id,
                Type: CallSignalTypeEnum.EndCall,
                SenderUserId: store.user?.id,
                notificationType: NotificationTypes.Hangup,
            }
        };

        // Send the request using the WebSocket service
        if (wsService) {
            handleRequest(wsService, endCallRequest);
        } else {
            console.error("WebSocket service is not available.");
        }
    }

    // Reset the user call state
    store.userCall = null;
}