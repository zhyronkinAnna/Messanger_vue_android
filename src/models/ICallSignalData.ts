import { CallSignalTypeEnum } from "./CallSignalTypeEnum";
import { NotificationTypes } from "./NotificationTypesEnum";
export interface ICallSignalData  {
    TargetUserId: string;
    SenderUserId: string
    Type: CallSignalTypeEnum
    Sdp: string;
    Candidate: string;
    notificationType?: NotificationTypes;
}
export function convertToICallSignalData(data: any): ICallSignalData {
    return {
        TargetUserId: data.targetUserId,
        SenderUserId: data.senderUserId,
        Type: data.type,
        Sdp: data.sdp,
        Candidate: data.candidate,
    };
}