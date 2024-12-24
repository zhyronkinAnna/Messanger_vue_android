export interface IUser {
    id?: number;
    email?: string;
    password?: string;
    username?: string;
    last_login?: Date;
    created_at?: Date;
    description?: string;
    avatar_url?: string;
}

export function convertToIUser(data: any): IUser {
    return {
        id: data.id,
        email: data.email,
        password: data.password,
        username: data.username,
        last_login: data.last_login ? new Date(data.last_login) : undefined,
        created_at: data.created_at ? new Date(data.created_at) : undefined,
        description: data.description,
        avatar_url: data.avatar_url,
    };
}