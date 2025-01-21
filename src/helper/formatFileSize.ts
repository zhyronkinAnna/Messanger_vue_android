/**
 * Formats a file size in bytes into a human-readable string with appropriate units.
 * 
 * @param size - The file size in bytes.
 * @returns A string representing the file size in a human-readable format.
 */

export function formatFileSize(size: number): string {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
}