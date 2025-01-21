/**
 * Downloads a file from the given URL and saves it with the specified file name.
 *
 * @param {string} fileLink - The URL of the file to be downloaded.
 * @param {string} fileName - The name to save the downloaded file as.
 * @returns {Promise<void>} A promise that resolves when the file has been downloaded and saved.
 *
 * @throws {Error} If the HTTP request fails or the response is not ok.
 *
 * @example
 * ```typescript
 * downloadFile('https://example.com/file.pdf', 'downloadedFile.pdf')
 *   .then(() => console.log('File downloaded successfully'))
 *   .catch(error => console.error('Error downloading file:', error));
 * ```
 */

export async function downloadFile(fileLink: string, fileName: string) {
    try {
        const response = await fetch(fileLink);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Error downloading file:", error);
    }
}