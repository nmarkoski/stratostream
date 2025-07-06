export default function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    if (
        !Array.isArray(array) ||
        chunkSize <= 0 ||
        !Number.isInteger(chunkSize)
    ) {
        throw new Error(
            "Invalid input. array must be an array, and chunkSize must be a positive integer.",
        );
    }

    const chunks: T[][] = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }

    return chunks;
}
