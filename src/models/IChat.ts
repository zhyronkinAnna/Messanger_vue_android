import { ChatType } from "./ChatTypeEnum";
import { convertToIChatMessage, IChatMessage } from "./IChatMessage";

export interface IChat {
    chat_id: number;
    id_of_user_chat: number;
    last_message: IChatMessage;
    type_id: ChatType;
    unread_messages_count: number;
    is_muted: boolean;
    messages: IChatMessage[];
}

export function convertToIChat(data: any): IChat {
    const last_message = convertToIChatMessage({text: data.last_message, sent_at: data.sent_time, is_read: data.is_read});
    return {
        chat_id: data.chat_id,
        id_of_user_chat: data.id_of_user_chat,
        last_message: last_message,
        type_id: data.type_id,
        unread_messages_count: data.unread_messages_count,
        is_muted: data.is_muted,
        messages: data.messages,
    };
}