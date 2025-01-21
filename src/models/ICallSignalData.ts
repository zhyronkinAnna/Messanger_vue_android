import { CallSignalTypeEnum } from "./CallSignalTypeEnum";
import { NotificationTypes } from "./NotificationTypesEnum";
export interface ICallSignalData  {
    TargetUserId: string;
    SenderUserId: string
    Type: CallSignalTypeEnum
    Sdp: string;
    Candidate: string;
    notificationType?: NotificationTypes;
    SdpMLineIndex: number;
    SdpMid: string;
} 

export function convertToICallSignalData(data: any): ICallSignalData {
    return {
        TargetUserId: data.targetUserId,
        SenderUserId: data.senderUserId,
        Type: data.type,
        Sdp: data.sdp,
        Candidate: data.candidate,
        SdpMLineIndex: data.SdpMLineIndex,
        SdpMid: data.SdpMid
    };
}