import { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";
import { IError } from "../models";
import { showErrorNotification } from "./showError";

export function handleError(error: IError | undefined, notification: NotificationApiInjection): boolean {
    if (error && error !== undefined && error !== null) {
        showErrorNotification(notification, error);
        return true;
    }
    return false;
}