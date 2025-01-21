/**
 * Converts a File object to a Base64 encoded string.
 * 
 * @param {File} file - The file to be converted.
 * @returns {Promise<string>} - A promise that resolves to the Base64 encoded string.
 */

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result?.toString().split(",")[1]; // Получаем строку Base64 без префикса
            if (base64String) {
                resolve(base64String);
            } else {
                reject(new Error("Failed to convert file to Base64"));
            }
        };
        reader.onerror = () => {
            reject(new Error("Error reading file"));
        };
        reader.readAsDataURL(file);
    });
}