import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export type Point = [number, number];
export type Line = { start: Point, end: Point };

export function parseInput(input: string[]): Line[] {
    return input.map(function (line) {
        const [start, end] = line.split("->").map(str => str.trim());
        const [x1, y1] = start.split(",").map(Number);
        const [x2, y2] = end.split(",").map(Number);
        return { start: [x1, y1], end: [x2, y2] };
    });
}

export function getGrid(lines: Line[]): number[][] {
    const grid = Array.from({ length: 1000 }, () => Array(1000).fill(0));
    lines.forEach(function ({ start, end }) {
        const [x1, y1] = start;
        const [x2, y2] = end;

        if (x1 === x2) {
            const [minY, maxY] = [Math.min(y1, y2), Math.max(y1, y2)];
            for (let i = minY; i <= maxY; i++) {
                grid[i][x1]++;
            }
        }

        if (y1 === y2) {
            const [minX, maxX] = [Math.min(x1, x2), Math.max(x1, x2)];
            for (let i = minX; i <= maxX; i++) {
                grid[y1][i]++;
            }
        }
        if (Math.abs(x1 - x2) == Math.abs(y1 - y2)) {
            let xStep = x2 > x1 ? 1 : -1;
            let yStep = y2 > y1 ? 1 : -1;
            let x = x1;
            let y = y1;

            while (x !== x2 + xStep && y !== y2 + yStep) {
                grid[y][x]++;
                x += xStep;
                y += yStep;
            }
        }
    });
    return grid;
}

export const countOverlaps = (grid: number[][]): number => {
    let count = 0;
    grid.forEach(row => {
        row.forEach(point => {
            if (point >= 2) {
                count++;
            }
        });
    });
    return count;
};

export async function readFile(fileName: string): Promise<string[]> {
    const lines: string[] = [];
    const readLine = createInterface({
        input: createReadStream(fileName),
        crlfDelay: Infinity
    });

    for await (const line of readLine) {
        lines.push(line.trim());
    }

    return lines;
}