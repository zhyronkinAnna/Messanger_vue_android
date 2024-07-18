import { IUser } from "./IUser";

export interface ISignUpForm extends IUser {
    retype_password?: string
}
