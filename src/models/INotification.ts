import { IMessage } from "./IMessage";
import { NotificationTypes } from "./NotificationTypesEnum";

export interface INotification extends IMessage {
    TypeOfNotification: NotificationTypes;
}
