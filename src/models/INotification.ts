import { handleError } from "../helper";
import { useStore } from "../stores/store";
import { IMessage } from "./IMessage";
import { NotificationTypes } from "./NotificationTypesEnum";

export interface INotification extends IMessage {
    TypeOfNotification: NotificationTypes;
    data: any;
}

const store = useStore();

export function handleNotification(notification: INotification): void {
    switch (notification.TypeOfNotification) {
        case NotificationTypes.Error:
            console.log('Handling Type1 Notification:', notification.data);
            break;

        case NotificationTypes.NewChat:
            console.log('Handling Type2 Notification:', notification.data);
            break;

        case NotificationTypes.NewMessage:
            debugger
            handleError({ subject: "Sign in Error", body: "wqdqwdqwdqwdqwdqwdqwdqwdwqqdwdqwd" }, store.messangerNotification)
            break;

        default:
            console.error('Unknown Notification Type:', notification.TypeOfNotification);
            break;
    }
}