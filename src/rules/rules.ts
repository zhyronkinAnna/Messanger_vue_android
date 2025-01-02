import type { FormItemRule } from 'naive-ui'
import { validateEmail } from '../helper';

export function useRules() {
    return {
        SignIn: {
            email: {
                validator(rule: FormItemRule, value: string) {
                    return  validateEmail(value || "")
                },
                trigger: 'blur',
                message: 'Please enter a valid email address'
            },
            password: {
                validator(rule: FormItemRule, value: string) {
                    return value != null && value != '';
                },
                trigger: 'blur',
                message: 'Please entry this field'
            }
        },
        SignUp: {
            username: {
                validator(rule: FormItemRule, value: string) {
                    return value != null && value != '';
                },
                trigger: 'blur',
                message: 'Please entry this field'
            },
            email: {
                validator(rule: FormItemRule, value: string) {
                    return  validateEmail(value || "")
                },
                trigger: 'blur',
                message: 'Please enter a valid email address'
            },
            password: {
                validator(rule: FormItemRule, value: string) {
                    return value != null && value != '';
                },
                trigger: 'blur',
                message: 'Please entry this field'
            },
            retype_password: {
                validator(rule: FormItemRule, value: string) {
                    return value != null && value != '';
                },
                trigger: 'blur',
                message: 'Please entry this field'
            }
        },
        ForgotPassword: {
            email: {
                validator(rule: FormItemRule, value: string) {
                    return  validateEmail(value || "")
                },
                trigger: 'blur',
                message: 'Please enter a valid email address'
            }
        },
        SetNewPassword: {
            password: {
                validator(rule: FormItemRule, value: string) {
                    return value != null && value != '';
                },
                trigger: 'blur',
                message: 'Please entry this field'
            },
            retype_password: {
                validator(rule: FormItemRule, value: string) {
                    return value != null && value != '';
                },
                trigger: 'blur',
                message: 'Please entry this field'
            }
        }
    }
}