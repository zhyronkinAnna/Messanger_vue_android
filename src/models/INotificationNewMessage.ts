import { convertToIChatMessage, IChatMessage } from "./IChatMessage";

export interface INotificationNewMessage {
    chat_title: string;
    message: IChatMessage;
    chat_id: number;
}

export function convertToINotificationNewMessage(data: any): INotificationNewMessage {
    const message = convertToIChatMessage(data);
    return {
        chat_title: data.chat_title,
        message: message,
        chat_id: data.chat_id,
    };
}