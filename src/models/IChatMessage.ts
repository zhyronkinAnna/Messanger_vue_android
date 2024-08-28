import { ReadTypes } from "./ReadTypesEnum";

export interface IChatMessage {
    text: string;
    sent_at: Date;
    is_read: ReadTypes;
}

export function convertToIChatMessage(data: any): IChatMessage {
    return {
        text: data.text,
        sent_at: data.sent_at,
        is_read: data.is_read,
    };
}