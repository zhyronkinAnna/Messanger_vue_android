export interface IUser {
    id?: string;
    email?: string;
    password?: string;
    username?: string;
    last_login?: Date;
    description?: string;
    avatar_url?: string;
    logout_time?: Date;
}

export function convertToIUser(data: any): IUser {
    return {
        id: data.id,
        email: data.email,
        password: data.password,
        username: data.username,
        last_login: data.last_login ? new Date(data.last_login) : undefined,
        description: data.description,
        avatar_url: data.avatar_url,
    };
}