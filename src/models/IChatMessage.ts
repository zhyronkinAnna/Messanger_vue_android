import { ChatMessageTypes } from "./ChatMessageTypesEnum";
import { ReadTypes } from "./ReadTypesEnum";

export interface IChatMessage {
    message_id?: number;
    text?: string;
    sent_at: Date;
    is_read: ReadTypes;
    type: ChatMessageTypes;
    file_title?: string;
    username?: string;
    file_size?: string;
}

export function convertToIChatMessage(data: any): IChatMessage {
    return {
        text: data.text,
        sent_at: data.sent_at,
        is_read: data.is_read,
        message_id: data.message_id,
        username: data.username,
        type: data.type,
        file_title: data.file_title,
        file_size: data.file_size
    };
}
