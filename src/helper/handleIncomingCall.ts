import { CallSignalTypeEnum, IRequest, NotificationTypes } from "../models";
import { WebSocketService } from "../services/websocket";
import { handleRequest } from "./requestHandler";

export async function handleIncomingCall(store: any, wsService: WebSocketService | null) {
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

    let localStream: MediaStream | null = null;

    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Локальные треки:", localStream.getTracks());
        localStream.getTracks().forEach(track => store.peerConnection!.addTrack(track, localStream!));
    } catch (error) {
        console.error("Ошибка при доступе к микрофону на принимающей стороне:", error);
        return;
    }
    await store.peerConnection.setRemoteDescription(new RTCSessionDescription({
        type: "offer",
        sdp: store.dataForCall!.Sdp
    }));

    const answer = await store.peerConnection.createAnswer();

    await store.peerConnection.setLocalDescription(answer);

    const answerRequest: IRequest = {
        command: "HandleCall",
        data: {
            TargetUserId: store.dataForCall!.SenderUserId,
            Type: CallSignalTypeEnum.Answer,
            Sdp: answer.sdp,
            Candidate: null,
            notificationType: NotificationTypes.CallAnswer,
            SenderUserId: store.user?.id
        }
    };

    handleRequest(wsService!, answerRequest);
    
    store.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
            const candidateRequest: IRequest = {
                command: "HandleCall",
                data: {
                    TargetUserId: store.dataForCall!.SenderUserId,
                    Type: CallSignalTypeEnum.Candidate,
                    Candidate: event.candidate.candidate,
                    SenderUserId: store.user?.id,
                    notificationType: NotificationTypes.ICECandidate,
                    SdpMid: event.candidate.sdpMid,
                    SdpMLineIndex: event.candidate.sdpMLineIndex,
                }
            };
            handleRequest(wsService!, candidateRequest);
        }
    };
}