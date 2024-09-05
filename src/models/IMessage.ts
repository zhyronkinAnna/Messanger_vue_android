import { MessageTypeEnum } from "./MessageTypeEnum";

export interface IMessage {
    data: JSON;
    type: MessageTypeEnum;
}
