export function clone<T>(item: T, count: number): T[] {
    const arr: T[] = [];

    for (let i = 0; i < count; i++) {
        arr.push(item);
    }

    return arr;
};