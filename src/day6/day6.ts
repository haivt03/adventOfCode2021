import { readFileSync } from 'fs';

function initializeFishTimers(fishAges: number[]): number[] {
    let fishTimes = Array(9).fill(0);
    fishAges.forEach(age => {
        fishTimes[age]++;
    });
    return fishTimes;
}
function simulateDay(fishTimes: number[]): number[] {
    const spawnFish = fishTimes[0];
    for (let i = 0; i < fishTimes.length - 1; i++) {
        fishTimes[i] = fishTimes[i + 1];
    }
    fishTimes[6] += spawnFish;
    fishTimes[8] = spawnFish;
    return fishTimes;
}

function simulateDays(fishTimes: number[], days: number): number[] {
    for (let day = 1; day <= days; day++) {
        fishTimes = simulateDay(fishTimes);
    }
    return fishTimes;
}

function countTotalFish(fishTimes: number[]): number {
    return fishTimes.reduce((total, fishCount) => total + fishCount, 0);
}

export function simulateLanternfish(fishAges: number[], days: number): number {
    let fishTimes = initializeFishTimers(fishAges);
    fishTimes = simulateDays(fishTimes, days);
    return countTotalFish(fishTimes);
}

export function readFile(fileName: string): number[] {
    return readFileSync(fileName, 'utf-8')
        .split(',')
        .map(Number)
        .filter(time => !isNaN(time));
}
