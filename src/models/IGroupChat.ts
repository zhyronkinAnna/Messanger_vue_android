import { convertToIChat, IChat } from "./IChat";
import { IChatInfo } from "./IChatInfo";

export interface IGroupChat extends IChat {
    avatar_url?: string;
    description: string;
    chat_title: string;
    created_at: Date;
}

export function convertToIGroupChat(data: any, chatInfo?: IChatInfo): IGroupChat {
    const baseChat: IChat = convertToIChat(data); 

    return {
        ...baseChat,
        avatar_url: data.avatar_url,
        description: chatInfo?.description ?? data.description,
        chat_title: data.chat_title,
        created_at: data.created_at,
    };
}
