export function isSecurePassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return false;
    }
    if (!hasUpperCase) {
        return false;
    }
    if (!hasLowerCase) {
        return false;
    }
    if (!hasNumber) {
        return false;
    }
    if (!hasSpecialChar) {
        return false;
    }

    return true;
}