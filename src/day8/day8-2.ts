import { createReadStream } from 'fs';
import { createInterface } from 'readline';

function parseLine(line: string): { input: string[], output: string[] } {
    const [input, output] = line.split(' | ');
    return {
        input: input.split(' ').map(pattern => pattern.trim()),
        output: output.split(' ').map(pattern => pattern.trim())
    };
}

function getSortedString(str: string): string {
    return str.split('').sort().join('');
}

export function deduceDigits(inputPatterns: string[]): Record<string, number> {
    const digits: Record<number, string> = {};
    const lengthMap: Record<number, string[]> = {};

    inputPatterns.forEach(pattern => {
        const length = pattern.length;
        if (!lengthMap[length]) lengthMap[length] = [];
        lengthMap[length].push(pattern);
    });

    digits[1] = lengthMap[2][0];
    digits[4] = lengthMap[4][0];
    digits[7] = lengthMap[3][0];
    digits[8] = lengthMap[7][0];

    const sixSegmentNumbers = lengthMap[6];
    sixSegmentNumbers.forEach(pattern => {
        if (!containsAll(pattern, digits[1])) {
            digits[6] = pattern;
        } else if (containsAll(pattern, digits[4])) {
            digits[9] = pattern;
        } else {
            digits[0] = pattern;
        }
    });

    const fiveSegmentNumbers = lengthMap[5];
    fiveSegmentNumbers.forEach(pattern => {
        if (containsAll(pattern, digits[1])) {
            digits[3] = pattern;
        } else if (containsMostOf(pattern, digits[6])) {
            digits[5] = pattern;
        } else {
            digits[2] = pattern;
        }
    });

    const patternToDigit: Record<string, number> = {};
    Object.keys(digits).forEach(key => {
        patternToDigit[getSortedString(digits[Number(key)])] = Number(key);
    });

    return patternToDigit;
}

function containsAll(str: string, pattern: string): boolean {
    return pattern.split('').every(char => str.includes(char));
}

function containsMostOf(str: string, pattern: string): boolean {
    const commonChars = pattern.split('').filter(char => str.includes(char));
    return commonChars.length === pattern.length - 1;
}

export function decodeOutput(outputPatterns: string[], digitMap: { [key: string]: number }): number {
    return Number(outputPatterns.map(pattern => digitMap[getSortedString(pattern)]).join(''));
}

export async function readFile(fileName: string): Promise<{ inputs: string[][], outputs: string[][] }> {
    const inputs: string[][] = [];
    const outputs: string[][] = [];

    const readLine = createInterface({
        input: createReadStream(fileName),
        crlfDelay: Infinity,
    });

    for await (const line of readLine) {
        const { input, output } = parseLine(line);
        inputs.push(input);
        outputs.push(output);
    }

    return { inputs, outputs };
}


