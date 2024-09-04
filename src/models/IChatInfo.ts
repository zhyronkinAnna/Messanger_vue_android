export interface IChatInfo {
    description: string;
    email: string;
}

export function convertToIChatInfo(data: any): IChatInfo {
    return {
        description: data.description,
        email: data.email,
    };
}