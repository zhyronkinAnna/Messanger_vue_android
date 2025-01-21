import { FormInst } from "naive-ui";
import { showErrorNotification } from "./showError";
import { IError } from "../models";
import { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";

/**
 * Validates the form and shows an error notification if validation fails.
 * 
 * @param formRef - The form instance to be validated.
 * @param notification - The notification API injection to show error notifications.
 */
export async function formValidation(formRef: FormInst, notification: NotificationApiInjection) {
    try {
        // Validate the form
        await formRef.validate((errors) => {
            if (errors) {
                // If there are validation errors, create an error object
                const error: IError = { subject: "Error", body: "Please ensure all fields are filled out correctly" };
                // Show error notification
                showErrorNotification(notification, error);
            }
        });
    } catch (error) {
        // Handle any unexpected errors during validation
        const unexpectedError: IError = { subject: "Unexpected Error", body: "An unexpected error occurred during form validation" };
        showErrorNotification(notification, unexpectedError);
    }
}