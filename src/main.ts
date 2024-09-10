// // day 1
// import { countDepthIncreses, createThreeMeasurement, readFile } from "./day1/day1";





// const fileName = './src/day1/inputDay1.txt';
// async function main(fileName: string): Promise<void> {
//   const depths = await readFile(fileName);

//   const threeMeasurement = createThreeMeasurement(depths);

//   console.log(countDepthIncreses(threeMeasurement));
// }
// main(fileName);

//day2
// import { readFile } from "./day2/day2";

// const fileName = './src/day2/inputDay2.txt';

// async function main() {
//   const { horizontal, depth } = await readFile(fileName);
//   console.log("Horizontal: ", horizontal);
//   console.log("Depth: ", depth);
//   console.log("Multiplying: ", horizontal * depth);
// }
// main();



//day3
// import { calculateLifeSupportRating, calculatePowerConsumption, calculateRates, readFile } from "./day3/day3";

// const fileName = './src/day3/inputDay3.txt';

// async function main() {
//     const diagnostic = await readFile(fileName);
//     const { gammaRates, epsilonRates } = calculateRates(diagnostic);
//     const powerConsumption = calculatePowerConsumption(gammaRates, epsilonRates);
//     console.log("Power consumption of the submarine:", powerConsumption);
//     const lifeSupportRating = calculateLifeSupportRating(diagnostic);
//     console.log("Life Support Rating:", lifeSupportRating);
// }
// main();



// //day5 
// import { countOverlaps, getGrid, parseInput, readFile } from "./day5/day5";

// const fileName = './src/day5/inputDay5.txt';
// async function main() {
//     const fileLine = await readFile(fileName);
//     const line = parseInput(fileLine);
//     const grid = getGrid(line);
//     const countOverlap = countOverlaps(grid);
//     console.log(countOverlap);
// }
// main();


// //day6
// import { readFile, simulateLanternfish } from "./day6/day6";

// const fileName = './src/day6/inputDay6.txt';
// async function main() {
//     const lanternfishAges = await readFile(fileName);
//     const totalFish = simulateLanternfish(lanternfishAges, 256);
//     console.log(totalFish);
// }
// main();


// //day7
//import { calculationFuelCost, findMedian, findMediumPos, readFile } from "./day7/day7";
// const fileName = './src/day7/inputDay7.txt';
// async function main() {
//     const positions = await readFile(fileName);
//     const cheapestPosition1 = findMedian(positions);
//     const cheapestPosition2 = findMediumPos(positions);
//     const fuelCost1 = calculationFuelCost(positions, cheapestPosition1);
//     const fuelCost2 = calculationFuelCost(positions, cheapestPosition2);
//     console.log(`Cheapest position: `, cheapestPosition1);
//     console.log(`Cheapest position: `, cheapestPosition2);
//     console.log(`Fuel cost: `, fuelCost1);
//     console.log(`Fuel cost: `, fuelCost2);
//     console.log();
// }
// main();

// //day8
// // import { countEasyDigits, readFile } from "./day8/day8-1";

// const fileName = './src/day8/inputDay8.txt';
// // async function main() {
// //     const { inputs, outputs } = await readFile(fileName);
// //     const digits = countEasyDigits(outputs);
// //     console.log(digits);
// // }
// // main();


// import { decodeOutput, deduceDigits, readFile } from "./day8/day8-2";

// async function main() {
//     const { inputs, outputs } = await readFile(fileName);

//     let totalSum = 0;

//     for (let i = 0; i < inputs.length; i++) {
//         const inputPatterns = inputs[i];
//         const outputPatterns = outputs[i];

//         const digitMap = deduceDigits(inputPatterns);
//         const outputValue = decodeOutput(outputPatterns, digitMap);

//         totalSum += outputValue;
//     }

//     console.log("Total sum of output values:", totalSum);
// }

// main();

//day10
import { calculateSyntaxErrorScore, readFile } from "./day10/day10";

const fileName = './src/day10/input.txt';
async function main() {
    const lines = await readFile(fileName);
    const totalScore = calculateSyntaxErrorScore(lines);
    console.log("Total Syntax Error Score:", totalScore);
}

main();