function interpretInput(input: string): number[][] {
  let lines = input.split("\n");
  let numbers: number[][] = [];
  for (let line of lines) {
    let match = line.match(/\-?\d+/g);
    if (!match) continue;
    numbers.push(match.map(n => parseInt(n)));
  }
  return numbers;
}

function findLowerLevelDifference(line: number[]): number[] {
  let lowerLevel: number[] = [];
  for (let i = 0; i < line.length - 1; i++) {
    lowerLevel.push(line[i + 1] - line[i]);
  }
  return lowerLevel;
}

function extrapolateLine(line: number[]): number {
  if (line.length == 0 || line.every(n => n === 0)) return 0;
  let lowerLineExtrapolation = extrapolateLine(findLowerLevelDifference(line));
  return line[line.length - 1] + lowerLineExtrapolation;
}

export function sumOfExtrapolatedValues(input: string) {
  let numbers = interpretInput(input);
  let sum = 0;
  for (let line of numbers) {
    sum += extrapolateLine(line);
  }

  return sum;
}

export function sumOfBackwardsExtrapolatedValues(input: string) {
  return 0;
}

function main(data: string) {
  console.log(sumOfExtrapolatedValues(data));
  console.log(sumOfBackwardsExtrapolatedValues(data));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_09_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
