import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export function countDepthIncreses(depth: number[]): number {
  let increases = 0;

  for (let i = 1; i < depth.length; i++) {
    if (depth[i] > depth[i - 1]) {
      increases++;
    }
  }

  return increases;
}
function isValidNumber(num: string): boolean {
  return !isNaN(Number(num.trim()));
}
export function createThreeMeasurement(depths: number[]): number[] {
  const threeMeasurement: number[] = [];
  for (let i = 0; i < depths.length - 2; i++) {
    let sum = depths[i] + depths[i + 1] + depths[i + 2];
    threeMeasurement.push(sum);
  }
  return threeMeasurement;
}

export async function readFile(fileName: string): Promise<number[]> {
  const fileStream = createReadStream(fileName);

  const readLine = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const depths: number[] = [];
  
  for await (const line of readLine) {
    const depth = Number(line.trim());
    if (!isNaN(depth)) {
      depths.push(depth);
    }
  }

  return depths;
}