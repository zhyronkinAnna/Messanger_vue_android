import { endCallAndSendRequestToReceiver, formatDateTime, handleRequest, showInfoNotification } from "../helper";
import { useWsService } from "../services/wsServiceManager";
import { useStore } from "../stores/store";
import { CallSignalTypeEnum } from "./CallSignalTypeEnum";
import { convertToChat } from "./ChatConverter";
import { ChatType } from "./ChatTypeEnum";
import { convertToICallSignalData } from "./ICallSignalData";
import { convertToIChat } from "./IChat";
import { IGroupChat } from "./IGroupChat";
import { IMessage } from "./IMessage";
import { convertToINotificationNewMessage } from "./INotificationNewMessage";
import { convertToINotificationUpdateMessageStatus } from "./INotificationUpdateMessageStatus";
import { IPrivateChat } from "./IPrivateChat";
import { IRequest } from "./IRequest";
import { convertToITokens } from "./ITokens";
import { convertToIUser } from "./IUser";
import { NotificationTypes } from "./NotificationTypesEnum";
import { convertToIChatMessage } from "./IChatMessage";


export interface INotification extends IMessage {
    typeOfNotification: NotificationTypes;
}

export async function handleNotification(notification: INotification): Promise<void> {
    const store = useStore();
    const wsService = useWsService();

    switch (notification.typeOfNotification) {
        case NotificationTypes.Error:
            console.debug('Handling Type1 Notification:', notification.data);
            break;

        case NotificationTypes.NewChat:
            const chat2 = convertToChat(notification.data);
            store.allChats.unshift(chat2);
            break;
        
        case NotificationTypes.Tokens:
            const tokens = convertToITokens(notification.data);
            store.setAccessToken(tokens.access_token);
            break;

        case NotificationTypes.SetAvatarUrl:
            const user = convertToIUser(notification.data);
            store.user = {
                ...store.user!,
                avatar_url: user.avatar_url
            };
            break;

        case NotificationTypes.NewUserAvatar:
            const chat4 = convertToIChat(notification.data);
            const user1 = convertToIUser(notification.data);

            const chat3 = store.allChats.find(chat => chat.chat_id === chat4.chat_id);
            
            if(chat3?.type_id === ChatType.Private) {
                (chat3 as IPrivateChat).user.avatar_url = user1.avatar_url;
                if(store.selectedChat?.type_id === ChatType.Private) {
                    if((store.selectedChat as IPrivateChat).chat_id === (chat3 as IPrivateChat).chat_id) {
                        (store.selectedChat as IPrivateChat).user.avatar_url = user1.avatar_url;
                    }
                }
            }
            else if(chat3?.type_id === ChatType.Group) {
                (chat3 as IGroupChat).avatar_url = user1.avatar_url;
                if(store.selectedChat?.type_id === ChatType.Group) {
                    if((store.selectedChat as IGroupChat).chat_id === (chat3 as IGroupChat).chat_id) {
                        (store.selectedChat as IGroupChat).avatar_url = user1.avatar_url;
                    }
                }
            }
            
            break;

        case NotificationTypes.UserOnline:
            const data3 = convertToChat(notification.data);
            
            const chats = store.allChats.filter(chat => chat.type_id === ChatType.Private);
            chats.forEach(chat => {
                if ((chat as IPrivateChat).user.id === (data3 as IPrivateChat).user.id) {
                    (chat as IPrivateChat).user.logout_time = (data3 as IPrivateChat).user.logout_time;
                    if(store.selectedChat?.type_id === ChatType.Private) {
                        if((store.selectedChat as IPrivateChat).user.id === (data3 as IPrivateChat).user.id) {
                            (store.selectedChat as IPrivateChat).onlineStatus = (data3 as IPrivateChat).user.logout_time! == null 
                            ? "Online" : formatDateTime((data3 as IPrivateChat).user.logout_time!);
                        }
                    }
                }
            });

            break;

        case NotificationTypes.MyUser:            
            store.user = convertToIUser(notification.data);
            store.router.push({ name: 'Messanger' });
            break;

        case NotificationTypes.UpdateMessageStatus:
            const data = convertToINotificationUpdateMessageStatus(notification.data);
            const chat = store.allChats.find(chat => chat.chat_id === data.chat_id);
            const message = chat?.messages.find(message => message.message_id === data.message_id);

            if (message) {
                message.is_read = data.is_read;
            }
            break;

        case NotificationTypes.CallOffer:
            store.dataForCall = convertToICallSignalData(notification.data);
            store.userCall = convertToIUser(notification.data);
            store.userCall.id = store.dataForCall.SenderUserId;

            console.log('CallOffer:', store.dataForCall);
            console.log('CallOffer:', notification.data);
            store.callPanel = true;
            store.incomingCall = true;
            break;
        case NotificationTypes.CallAnswer:
            await store.peerConnection!.setRemoteDescription(new RTCSessionDescription({
                type: "answer",
                sdp: convertToICallSignalData(notification.data).Sdp,
            }));

            store.peerConnection!.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log("Отправляем ICE-кандидат:", event.candidate);
            
                    const candidateRequest = {
                        command: "HandleCall",
                        data: {
                            TargetUserId: store.dataForCall!.SenderUserId, // Для принимающего
                            Type: CallSignalTypeEnum.Candidate,
                            Candidate: event.candidate.candidate,
                            SenderUserId: store.user?.id,
                            notificationType: NotificationTypes.ICECandidate,
                            SdpMid: event.candidate.sdpMid,            // Добавляем sdpMid
                            SdpMLineIndex: event.candidate.sdpMLineIndex,
                        }
                    };
                    handleRequest(wsService!, candidateRequest);
                }
            };

            store.incomingCall = false;
            store.outgoingCall = false;
            store.activeCall = true;
            break;
        case NotificationTypes.ICECandidate:
            console.log("Получен ICE-кандидат:", convertToICallSignalData(notification.data).Candidate);
            const candidate = new RTCIceCandidate({
                candidate: convertToICallSignalData(notification.data).Candidate,
                sdpMid: convertToICallSignalData(notification.data).SdpMid,
                sdpMLineIndex: convertToICallSignalData(notification.data).SdpMLineIndex
            });
            
            await store.peerConnection!.addIceCandidate(candidate);
            break;
        case NotificationTypes.Hangup:
            endCallAndSendRequestToReceiver(store, wsService, false);
            
            store.callPanel = false;
            store.incomingCall = false;
            store.outgoingCall = false;
            store.activeCall = false;
            break;

        case NotificationTypes.UpdateMessagesStatus:
            const data1 = convertToINotificationUpdateMessageStatus(notification.data);
            const chat1 = store.allChats.find(chat => chat.chat_id === data1.chat_id);
            if(chat1?.messages)
            {
                const filteredMessages = chat1?.messages.filter(message => message.message_id! >= data1.message_id && message.username === store.user?.username);
                if (filteredMessages) {
                    filteredMessages.forEach(message => message.is_read = data1.is_read);
                }
            }

            if (chat1) {
                chat1.last_message.is_read = data1.is_read;
            }

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
                        command: "SetNewFirstUnreadMessage", 
                        data: {
                            user_id: store.user?.id,
                            user_chat_id: selectedChat!.id_of_user_chat,
                            message_id: notificationNewMessage.message.message_id,
                            chat_id: selectedChat!.chat_id,
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
                    
                    if (!chatToUpdate.messages) {
                        chatToUpdate.messages = [];
                    }
                    chatToUpdate.messages.push(notificationNewMessage.message);
                }
                const chatIndex = store.allChats.indexOf(chatToUpdate);
                if (chatIndex > -1) {
                    store.allChats.splice(chatIndex, 1);
                    store.allChats.unshift(chatToUpdate);
                }
                
                if(chatToUpdate.is_muted === false) {
                    showInfoNotification(store.messangerNotification, { subject: "New message", body: `You have new Message in chat ${notificationNewMessage.chat_title}` });
                }
            }
            break;

        default:
            console.error('Unknown Notification Type:', notification.typeOfNotification);
            break;
    }
}