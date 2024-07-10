import { User } from "./user";

export interface SignUpForm extends User {
    retype_password?: string
}
