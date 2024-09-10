import { readFileSync } from 'fs';

export function findMedian(arr: number[]): number {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
}
export function findMediumPos(arr: number[]): number {
    let sum: number = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    let medium = Math.ceil(sum / arr.length);
    return medium;
}

export function calculationFuelCost(positions: number[], cheapestPos: number): number {
    return positions.reduce((totalFuel, position) => totalFuel + Math.abs(position - cheapestPos), 0);
};

export function readFile(fileName: string): number[] {
    return readFileSync(fileName, 'utf-8')
        .split(',')
        .map(Number)
        .filter(time => !isNaN(time));
}

