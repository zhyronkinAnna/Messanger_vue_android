/**
 * Formats a given date as a string.
 * If the date is today, it returns "today HH:MM".
 * If the date is yesterday, it returns "yesterday HH:MM".
 * Otherwise, it returns the date in "DD.MM.YYYY" format.
 * 
 * @param date - The date to format, either as a string or a Date object.
 * @returns The formatted date string.
 * @throws Will throw an error if the date is invalid.
 */

export function formatDateTime(date: string | Date): string {
    const now = new Date();
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format");
    }
    
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (parsedDate >= today) {
        return `today ${parsedDate.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    } else if (parsedDate >= yesterday) {
        return `yesterday ${parsedDate.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    } else {
        return parsedDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
}