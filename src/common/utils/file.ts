export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            resolve(reader.result as string);
        };

        reader.onerror = (error) => {
            reject(error);
        };
    });
};

export const getFileSizeError = (
    file: File,
    maxSizeBytes = MAX_FILE_SIZE_BYTES
): string | null => {
    if (file.size <= maxSizeBytes) {
        return null;
    }

    const maxSizeMb = maxSizeBytes / (1024 * 1024);
    return `${file.name} exceeds the ${maxSizeMb}MB limit`;
};

export const convertFilesToBase64 = async (files: File[]): Promise<string[]> => {
    const sizeError = files.map((file) => getFileSizeError(file)).find(Boolean);

    if (sizeError) {
        throw new Error(sizeError);
    }

    return Promise.all(files.map(convertToBase64));
};