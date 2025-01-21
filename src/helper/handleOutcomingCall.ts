import { CallSignalTypeEnum, IPrivateChat, IRequest, NotificationTypes } from "../models";
import { WebSocketService } from "../services/websocket";
import { handleRequest } from "./requestHandler";

export async function handleOutcomingCall(store: any, wsService: WebSocketService | null) {
    console.log("Outgoing call");

    store.peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    store.peerConnection.ontrack = (event: RTCTrackEvent) => {
        console.log("Получен медиапоток:", event.streams[0]);
        const audioElement = document.createElement("audio");
        audioElement.srcObject = event.streams[0];
        audioElement.autoplay = true;
        document.body.appendChild(audioElement);
    };

    store.peerConnection.onconnectionstatechange = () => {
        console.log("Состояние соединения:", store.peerConnection!.connectionState);
       
        if (store.peerConnection!.connectionState === "connected") {
            console.log("Соединение установлено!");
        }
    };

    let localStream: MediaStream | null  = null;

    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Локальные треки:", localStream.getTracks());
        localStream.getTracks().forEach(track => store.peerConnection!.addTrack(track, localStream!));
    } catch (error) {
        console.error("Ошибка при доступе к микрофону:", error);
        return;
    }

    const offer = await store.peerConnection.createOffer();

    await store.peerConnection.setLocalDescription(offer);

    const request: IRequest  = {
        command: "HandleCall", 
        data: {
            TargetUserId: (store.selectedChat as IPrivateChat)?.user.id,
            Type: CallSignalTypeEnum.Offer,
            Sdp: offer.sdp,
            Candidate: null,
            notificationType: NotificationTypes.CallOffer,
            SenderUserId: store.user?.id,
        }
    };
    
    handleRequest(wsService!, request);
}