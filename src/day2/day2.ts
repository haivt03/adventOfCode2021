import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export function isValidNumber(num: string): boolean {
    return !isNaN(Number(num.trim()));
}

function parseLine(line: string): { direction: string, value: number } {
    const [direction, valueStr] = line.split(' ');
    const value = parseInt(valueStr);
    if (Number.isNaN(value)) {
        throw new Error("is NaN");
    }
    return { direction, value };
}

function processDirection1(direction: string, value: number, horizontal: number, depth: number): { newHorizontal: number, newDepth: number } {
    switch (direction) {
        case 'forward':
            horizontal += value;
            break;
        case 'up':
            depth -= value;
            break;
        case 'down':
            depth += value;
            break;
    }
    return { newHorizontal: horizontal, newDepth: depth };
}

function processDirection2(direction: string, value: number, aim: number, horizontal: number, depth: number): { newHorizontal: number, newDepth: number, newAim: number } {
    switch (direction) {
        case 'forward':
            horizontal += value;
            depth += aim * value;
            break;
        case 'up':
            aim -= value
            break;
        case 'down':
            aim += value
            break;
    }
    return { newHorizontal: horizontal, newDepth: depth, newAim: aim };
}

export async function readFile(fileName: string): Promise<{ horizontal: number, depth: number }> {
    const fileStream = createReadStream(fileName);
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    const readLine = createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of readLine) {
        const { direction, value } = parseLine(line);
        const { newHorizontal, newDepth } = processDirection1(direction, value, horizontal, depth);
        //const { newHorizontal, newDepth, newAim } = processDirection2(direction, value, aim, horizontal, depth);
        horizontal = newHorizontal;
        depth = newDepth;
        //aim = newAim;
    }
    return { horizontal, depth };
}