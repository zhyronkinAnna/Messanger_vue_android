import { convertToIChat, IChat } from "./IChat";
import { IChatInfo } from "./IChatInfo";
import { IUser } from "./IUser";

export interface IPrivateChat extends IChat {
    user: IUser;
}

export function convertToIPrivateChat(data: any, chatInfo?: IChatInfo): IPrivateChat {
  const baseChat: IChat = convertToIChat(data);
  
  const user = {
    description: chatInfo?.description ?? data.description ?? '',
    email: chatInfo?.email ?? data.email ?? '',
    username: data.chat_title ?? data.user.username ??'',
  };

  return {
    ...baseChat,
    user,
  };
}
