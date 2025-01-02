import { ReadTypes } from "./ReadTypesEnum";
export interface INotificationUpdateMessageStatus {
    message_id: number;
    is_read: ReadTypes;
    chat_id: number;
}
export function convertToINotificationUpdateMessageStatus(data: any): INotificationUpdateMessageStatus {
    return {
        message_id: data.message_id,
        is_read: data.is_read,
        chat_id: data.chat_id,
    };
}