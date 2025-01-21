import { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";
import { IError } from "../models";
import { showErrorNotification } from "./showError";

/**
 * Handles an error by showing a notification if the error is defined.
 * 
 * @param error - The error object to handle.
 * @param notification - The notification API injection to show the error notification.
 * @returns A boolean indicating whether an error was handled.
 */
export function handleError(error: IError | undefined, notification: NotificationApiInjection): boolean {
    if (error) {
        showErrorNotification(notification, error);
        return true;
    }
    return false;
}