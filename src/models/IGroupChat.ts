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
        avatar_url: data?.avatar_url ?? "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
        description: chatInfo?.description ?? data.description,
        chat_title: data.chat_title,
        created_at: data.created_at,
    };
}
