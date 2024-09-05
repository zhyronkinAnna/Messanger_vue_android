import { FormInst } from "naive-ui";
import { showErrorNotification } from "./showError";
import { IError } from "../models";
import { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";

export async function formValidation(formRef: FormInst, notification: NotificationApiInjection){
    await formRef.validate((errors) => {
        if (errors) {
            const error: IError = { subject: "Error", body: "Please ensure all fields are filled out correctly" };
            showErrorNotification(notification, error);
        }
    });
}