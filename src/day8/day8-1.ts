import { createReadStream } from 'fs';
import { createInterface } from 'readline';

function parseLine(line: string): { input: string, output: string } {
    const [input, output] = line.split(' | ');
    return { input: input.trim(), output: output.trim() };
}

export function countEasyDigits(entry: string[]): number {
    const lengthNum: number[] = [2, 3, 4, 7]; // lengths corresponding to digits 1, 7, 4, 8
    let count = 0;
    
    entry.forEach(entryLine => {
        entryLine.split(" ").forEach(signal => {
            if (lengthNum.includes(signal.length)) {
                count++;
            }
        });
    });
    
    return count;
}

export async function readFile(fileName: string): Promise<{ inputs: string[], outputs: string[] }> {
    const inputs: string[] = [];
    const outputs: string[] = [];

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
