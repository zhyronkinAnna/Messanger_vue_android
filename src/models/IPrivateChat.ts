import { convertToIChat, IChat } from "./IChat";
import { IUser } from "./IUser";

export interface IPrivateChat extends IChat {
    user: IUser;
}

export function convertToIPrivateChat(data: any): IPrivateChat {
    const baseChat: IChat = convertToIChat(data);
    return {
        ...baseChat,
        user: {
            description: data.description,
            email: data.email,
            username: data.chat_title,
        }
    };
}