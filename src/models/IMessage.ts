import { MessageTypeEnum } from "./MessageTypeEnum";

export interface IMessage {
    data: string;
    type: MessageTypeEnum;
}
