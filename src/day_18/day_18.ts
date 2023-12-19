interface Instruction {
  distance: number,
  direction: number, // NESW 0-3
  colour: string
}

function interpretInput(input: string): Instruction[] {
  let instructions: Instruction[] = [];

  let lines = input.split("\n").map(line => line.trim()).filter(line => line);
  for (let line of lines) {
    let match = line.match(/(\w) (\d+) \((.+)\)/);
    if (!match || match.length < 4) {
      console.error(`Line ${line} does not match regex`);
      continue;
    }
    let directionString = match[1];

    function interpretDirection(dS: string): number {
      switch (dS) {
        case "U":
          return 0;
        case "R":
          return 1;
        case "D":
          return 2;
        case "L":
          return 3;
        default:
          console.error(`Direction ${dS} is not an expected value`);
          return 0;
      }
    }
    let direction = interpretDirection(directionString);
    let distanceString = match[2];
    let distance = parseInt(distanceString);
    if (distance != distance) console.error(`Distance ${distanceString} is not a number`);
    let colour = match[3];

    instructions.push({ distance, direction, colour })
  }

  return instructions;
}

export function digTrench(input: string): string {
  let instructions = interpretInput(input);
  return "";
}

export function excavateInterior(input: string): string {
  return "";
}

export function volumeOfLagoon(input: string): number {
  return 0;
}

function main(data: string) {
  console.log(data);
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_18_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
