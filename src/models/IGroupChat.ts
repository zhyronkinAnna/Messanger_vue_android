import { convertToIChat, IChat } from "./IChat";

export interface IGroupChat extends IChat {
    avatar_path: string;
    description: string;
    chat_title: string;
    created_at: Date;
}

export function convertToIGroupChat(data: any): IGroupChat {
    const baseChat: IChat = convertToIChat(data); 

    return {
        ...baseChat,
        avatar_path: data.avatar_path,
        description: data.description,
        chat_title: data.chat_title,
        created_at: data.created_at,
    };
}