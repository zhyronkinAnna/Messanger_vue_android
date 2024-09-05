import { IMessage } from "./IMessage";
import { MessageTypeEnum } from "./MessageTypeEnum";

export interface IResponse extends IMessage {
    requestId: string;
    errorMessage: string;
    type: MessageTypeEnum;
}
