export interface IUser {
    id?: number;
    email?: string;
    password?: string;
    username?: string;
    last_login?: Date;
    created_at?: Date;
    description?: string;
    avatar_id?: number;
}