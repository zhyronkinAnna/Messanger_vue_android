import { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";
import { IError } from "../models";

export function showErrorNotification(notification: NotificationApiInjection, error: IError) {
    console.error(error.body, error.subject)
    notification.error({
        title: error.subject,
        content: error.body,
        duration: 2000
    });
}

export function showInfoNotification(notification: NotificationApiInjection, error: IError) {
    console.error(error.body, error.subject)
    notification.info({
        title: error.subject,
        content: error.body,
        duration: 2000
    });
}