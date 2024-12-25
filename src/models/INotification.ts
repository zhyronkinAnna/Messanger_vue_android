import { handleRequest, showInfoNotification } from "../helper";
import { useWsService } from "../services/wsServiceManager";
import { useStore } from "../stores/store";
import { IMessage } from "./IMessage";
import { convertToINotificationNewMessage } from "./INotificationNewMessage";
import { IRequest } from "./IRequest";
import { NotificationTypes } from "./NotificationTypesEnum";

export interface INotification extends IMessage {
    typeOfNotification: NotificationTypes;
}

export function handleNotification(notification: INotification): void {
    const store = useStore();

    switch (notification.typeOfNotification) {
        case NotificationTypes.Error:
            console.debug('Handling Type1 Notification:', notification.data);
            break;

        case NotificationTypes.NewChat:
            console.debug('Handling Type2 Notification:', notification.data);
            break;

        case NotificationTypes.NewMessage:
            const notificationNewMessage = convertToINotificationNewMessage(notification.data);
            const chatToUpdate = store.allChats.find(chat => chat.chat_id === notificationNewMessage.chat_id);

            if (chatToUpdate) {
                chatToUpdate.last_message = notificationNewMessage.message;
                const selectedChat = store.selectedChat;

                if (selectedChat?.chat_id === notificationNewMessage.chat_id) {
                    const wsService = useWsService();
                    chatToUpdate.messages.push(notificationNewMessage.message);
                    const request: IRequest  = {
                        command: "ResetCountOfUnreadMessages", 
                        data: {
                            user_id: store.user?.id,
                            id: selectedChat!.id_of_user_chat,
                        }
                    };
                    
                    handleRequest(wsService!, request, false);
                }
                else {
                    if (chatToUpdate.unread_messages_count >= 0) {
                        chatToUpdate.unread_messages_count += 1;
                    }
                    else {
                        chatToUpdate.unread_messages_count = 1;
                    }
                    chatToUpdate.messages.push(notificationNewMessage.message);
                }
            }

            showInfoNotification(store.messangerNotification, { subject: "New message", body: `You have new Message in chat ${notificationNewMessage.chat_title}` });
            break;

        default:
            console.error('Unknown Notification Type:', notification.typeOfNotification);
            break;
    }
}