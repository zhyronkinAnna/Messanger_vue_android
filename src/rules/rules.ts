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
                    return value != null;
                },
                trigger: 'blur',
                message: 'Plese entry this field'
            }
        }
    }
}