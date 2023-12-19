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
  let x = 0;
  let y = 0;
  let minX = 0, maxX = 0;
  let minY = 0, maxY = 0;

  let horizontalVectors: {[y: number]: {startX: number, endX: number}[]} = {}
  let verticalVectors: {[x: number]: {startY: number, endY: number}[]} = {}

  function updatePosition(x, y, distance, direction): {x: number, y: number} {
    switch (direction) {
      case 0:
        return {x, y: y - distance};
      case 1:
        return {x: x + distance, y};
      case 2:
        return {x, y: y + distance};
      case 3:
        return {x: x - distance, y};
    }
  }
  for (let { distance, direction, colour } of instructions) {
    ({ x, y } = updatePosition(x, y, distance, direction));
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
    // if (direction == 0 || direction == 2) {
    //   if (!horizontalVectors.hasOwnProperty(y)) horizontalVectors[y] = [];
    //   let endX = distance == 2 ? x + distance : x - distance;
    //   horizontalVectors[y].push({startX: x, endX}); // Respect direction of movement - may come into play for colour for P2
    //   x = endX;
    //   if (x < minX) minX = x;
    // } else {
    //   if (!verticalVectors.hasOwnProperty(x)) verticalVectors[x] = [];
    //   let endY = distance == 1 ? y + distance : y - distance;
    //   verticalVectors[x].push({startY: y, endY});
    //   y = endY;
    //   if (y < minY) minY = y;
    // }
  }
  let rows = maxY - minY + 1;
  let columns = maxX - minX + 1;

  x = -minX;
  y = -minY;

  let output: string[][] = [];
  for (let row = 0; row < rows; row++) {
    let arr = Array(columns).fill(".");
    output.push(arr);
  }

  for (let { distance, direction, colour } of instructions) {
    let { x: newX, y: newY } = updatePosition(x, y, distance, direction);
    if (x == newX) {
      for (let yChange = y; yChange != newY; yChange += Math.sign(newY - y)) {
        output[yChange][x] = "#";
      }
      y = newY;
    } else {
      for (let xChange = x; xChange != newX; xChange += Math.sign(newX - x)) {
        output[y][xChange] = "#";
      }
      x = newX;
    }
  }

  return output.map(row => row.join("")).join("\n");
}

export function excavateInterior(input: string): string {
  let lines = input.split("\n").map(s => s.trim().split("")).filter(s => s.length > 0);
  let excavatedLines = input.split("\n").map(s => s.trim().split("")).filter(s => s.length > 0);
  for (let row = 1; row < lines.length - 1; row++) {
    let inInterior = false;
    let horizontalLineDetectorIndex = 0;
    let horizontalBalanceDetector = 0;
    for (let column = 0; column < lines[row].length; column++) {
      if (lines[row][column] == '#') {
        inInterior = !inInterior;
        if (lines[row - 1][column] != lines[row + 1][column]) {
          if (lines[row - 1][column] == '#') horizontalBalanceDetector--;
          if (lines[row + 1][column] == '#') horizontalBalanceDetector++;
          if (horizontalBalanceDetector == 0) {
            if ((column - horizontalLineDetectorIndex) % 2 == 1) inInterior = !inInterior;
          } else if (Math.abs(horizontalBalanceDetector) == 2) {
            if ((column - horizontalLineDetectorIndex) % 2 == 0) inInterior = !inInterior;
            horizontalBalanceDetector = 0;
          }
          horizontalLineDetectorIndex = column;
        }
      }
      if (inInterior) excavatedLines[row][column] = "#";
    }
  }
  return excavatedLines.map(row => row.join("")).join("\n");
}

export function volumeOfLagoon(input: string): number {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] == '#') count++;
  }
  return count;
}

function main(data: string) {
  console.log(volumeOfLagoon(excavateInterior(digTrench(data))));
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
