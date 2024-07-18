import { IMessage } from "./IMessage";
import { MessageTypeEnum } from "./MessageTypeEnum";

export interface IRespond extends IMessage {
    requestId: string;
    errorMessage: string;
    type: MessageTypeEnum;
}
