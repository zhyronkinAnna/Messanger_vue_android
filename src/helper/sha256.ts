import * as CryptoJS from 'crypto-js';

export function generateSHA256(input: string): string {
    return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}