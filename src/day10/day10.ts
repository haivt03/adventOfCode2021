import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const matchingPairs: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};

const autocompletePoints: { [key: string]: number } = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};

const errorPoints: { [key: string]: number } = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

function calculateCompletionScore(stack: string[]): number {
    let score = 0;
    while (stack.length > 0) {
        const opening = stack.pop()!;
        const closing = matchingPairs[opening];
        score = score * 5 + autocompletePoints[closing];
    }
    return score;
}

export function processLinesForCompletion(lines: string[]): number[] {
    const completionScores: number[] = [];

    lines.forEach(line => {
        const stack: string[] = [];
        let corrupted = false;

        for (let char of line) {
            if (matchingPairs[char]) {
                stack.push(char);
            } else {
                const lastOpening = stack.pop();
                if (matchingPairs[lastOpening!] !== char) {
                    corrupted = true;
                    break;
                }
            }
        }

        if (!corrupted && stack.length > 0) {
            const score = calculateCompletionScore(stack);
            completionScores.push(score);
        }
    });

    return completionScores;
}


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
