export const msToDurationView = (ms: number) => {

    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    let result = [];

    if (hours > 0) {
        result.push(`${hours} hr`);
    }
    if (remainingMinutes > 0) {
        result.push(`${remainingMinutes} min`);
    }
    if (remainingSeconds > 0 || result.length === 0) {
        result.push(`${remainingSeconds} sec`);
    }

    return result.join(', ');
}

export const msToDurationSeek = (ms: number) => {
    const seconds = Math.floor(ms / 1000);

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};