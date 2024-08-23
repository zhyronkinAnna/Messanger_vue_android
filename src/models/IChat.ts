import { ReadTypes } from "./ReadTypesEnum";

export interface IChat {
    avatar_path: string;
    chat_id: number;
    chat_title: string;
    created_at: Date;
    description: string;
    id_of_user_chat: number;
    last_message: string;
    sent_time: Date;
    type_id: number; //TODO
    unread_messages_count: number;
    is_read: ReadTypes;
}

export function convertToIChat(data: any): IChat {
    return {
        avatar_path: data.avatar_path,
        chat_id: data.chat_id,
        chat_title: data.chat_title,
        created_at: data.created_at,
        description: data.description,
        id_of_user_chat: data.id_of_user_chat,
        last_message: data.last_message,
        sent_time: data.sent_time,
        type_id: data.type_id,
        unread_messages_count: data.unread_messages_count,
        is_read: data.is_read,
    };
}