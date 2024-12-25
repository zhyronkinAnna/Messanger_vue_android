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
    avatar_url: data?.avatar_url ?? data?.user?.avatar_url ?? "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  };

  return {
    ...baseChat,
    user,
  };
}
