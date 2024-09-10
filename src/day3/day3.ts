import { createReadStream } from 'fs';
import { createInterface } from 'readline';

function binaryToDecimal(binary: string): number {
    const decimal = parseInt(binary, 2);
    if (isNaN(decimal)) {
        throw new Error(`Invalid binary string`);
    }
    return decimal;
}

export function calculateRates(diagnostic: string[]): { gammaRates: string, epsilonRates: string } {
    const bitLength = diagnostic[0].length;
    let gammaRate: string = '';
    let epsilonRate: string = '';

    for (let i = 0; i < bitLength; i++) {
        let count0: number = 0;
        let count1: number = 0;

        for (let j = 0; j < diagnostic.length; j++) {
            if (diagnostic[j][i] === '0') {
                count0++;
            } else {
                count1++;
            }
        }
        if (count0 < count1) {
            gammaRate += "1";
            epsilonRate += "0";
        } else {
            gammaRate += "0";
            epsilonRate += "1";
        }
    }
    return { gammaRates: gammaRate, epsilonRates: epsilonRate };
}

export function calculatePowerConsumption(gammaRate: string, epsilonRate: string): number {
    const gamma = binaryToDecimal(gammaRate);
    const epsilon = binaryToDecimal(epsilonRate);
    return gamma * epsilon;
}

export function filterByBitCriteria(numbers: string[], criteria: (count0: number, count1: number) => string, position: number = 0): string {
    if (numbers.length == 1) {
        return numbers[0];
    }
    let count0 = 0;
    let count1 = 0;
    for (const number of numbers) {
        if (number[position] == '0') {
            count0++;
        } else {
            count1++;
        }
    }
    const tagetBit = criteria(count0, count1);
    const filteredNumber = numbers.filter(number => number[position] == tagetBit);
    return filterByBitCriteria(filteredNumber, criteria, position + 1);
}

function getOxygenGeneratorRating(diagnostic: string[]): string {
    return filterByBitCriteria(diagnostic, (count0, count1) => (count1 >= count0 ? '1' : '0'));
}

function getCO2ScrubberRating(diagnostic: string[]): string {
    return filterByBitCriteria(diagnostic, (count0, count1) => (count0 <= count1 ? '0' : '1'));
}

export function calculateLifeSupportRating(diagnostic: string[]): number {
    const oxygenGeneratorRating = getOxygenGeneratorRating(diagnostic);
    const co2ScrubberRating = getCO2ScrubberRating(diagnostic);

    const oxygenDecimal = binaryToDecimal(oxygenGeneratorRating);
    const co2Decimal = binaryToDecimal(co2ScrubberRating);

    return oxygenDecimal * co2Decimal;
}


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