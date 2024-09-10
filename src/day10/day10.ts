import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const matchingPairs: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};

const errorPoints: { [key: string]: number } = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

export function calculateSyntaxErrorScore(lines: string[]): number {
    let totalScore = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const stack: string[] = [];

        for (let j = 0; j < line.length; j++) {
            const char = line[j];

            if (matchingPairs[char]) {
                stack.push(char);
            } else {
                const lastOpening = stack.pop();
                if (matchingPairs[lastOpening!] !== char) {
                    totalScore += errorPoints[char];
                    break;  
                }
            }
        }
    }

    return totalScore;
}

export async function readFile(fileName: string): Promise<string[]> {
    const lines: string[] = [];

    const fileStream = createReadStream(fileName);
    const rl = createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        lines.push(line.trim());  // Add each line to the array
    }

    return lines;
}
