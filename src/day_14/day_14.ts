export function cyclePlatform(input: string, cycles: number = 1): string {
  //NWSE
  let tiles = input.split("\n").map(s => s.trim()).filter(s => s.length != 0);
  let rows = tiles.length;
  if (rows == 0) return input;
  let columns = tiles[0].length;

  let cubeStoneColumns: number[][] = [];  // Which columns are cubes on, by row (tilt W/E)
  let cubeStoneRows: number[][] = [];  // Which rows are cubes on, by column (tilt N/S)

  let roundedStones: {row: number, column: number}[] = [];
  let previousRoundedStones = roundedStones;
  let previousHashes: bigint[] = [];

  for (let column = 0; column < columns; column++) {
    cubeStoneRows.push([-1]);
  }
  for (let row = 0; row < rows; row++) {
    let cubesOnRow = [-1];
    for (let column = 0; column < columns; column++) {
      if (tiles[row][column] == '#') {
        cubesOnRow.push(column);
        cubeStoneRows[column].push(row);
      }
      if (tiles[row][column] == 'O') {
        roundedStones.push({row, column});
      }
    }
    cubesOnRow.push(columns);
    cubeStoneColumns.push(cubesOnRow);
  }
  for (let column = 0; column < columns; column++) {
    cubeStoneRows[column].push(rows);
  }

  let verticalOffsets: number[][] = [];
  for (let column = 0; column < columns; column++) {
    let arr = Array(cubeStoneRows.length).fill(0);
    verticalOffsets.push(arr);
  }

  let horizontalOffsets: number[][] = [];
  for (let row = 0; row < rows; row++) {
    let arr = Array(cubeStoneColumns.length).fill(0);
    horizontalOffsets.push(arr);
  }

  function regenerateBoard(tiles: string[], roundedStones: {row: number, column: number}[]): string {
    let rowsWithoutStones = tiles.map(row => row.replaceAll("O", "."));

    for (let stone of roundedStones) {
      let row = rowsWithoutStones[stone.row];
      rowsWithoutStones[stone.row] = row.slice(0, stone.column) + 'O' + row.slice(stone.column + 1);
    }

    return rowsWithoutStones.join("\n");
  }

  roundedStones = [];
  let foundCycle = false;
  for (let cycle = 0; cycle < cycles; cycle++) {
  
    // North
    verticalOffsets.forEach(arr => arr.fill(1));
    for (let stone of previousRoundedStones) {
      let firstIndex = -1 + cubeStoneRows[stone.column].findIndex(v => v > stone.row);
      let newRow = verticalOffsets[stone.column][firstIndex] + cubeStoneRows[stone.column][firstIndex];
      roundedStones.push({row: newRow, column: stone.column});
      verticalOffsets[stone.column][firstIndex] += 1;
    }
    previousRoundedStones = roundedStones;
    roundedStones = [];

    // West
    horizontalOffsets.forEach(arr => arr.fill(1));
    for (let {row, column} of previousRoundedStones) {
      let cubeIndex = -1 + cubeStoneColumns[row].findIndex(v => v > column);
      let newColumn = horizontalOffsets[row][cubeIndex] + cubeStoneColumns[row][cubeIndex];
      roundedStones.push({row, column: newColumn});
      horizontalOffsets[row][cubeIndex] += 1;
    }
    previousRoundedStones = roundedStones;
    roundedStones = [];

    // South
    verticalOffsets.forEach(arr => arr.fill(1));
    for (let stone of previousRoundedStones) {
      let firstIndex = cubeStoneRows[stone.column].findIndex(v => v > stone.row);
      let newRow = cubeStoneRows[stone.column][firstIndex] - verticalOffsets[stone.column][firstIndex];
      roundedStones.push({row: newRow, column: stone.column});
      verticalOffsets[stone.column][firstIndex] += 1;
    }
    previousRoundedStones = roundedStones;
    roundedStones = [];

    // East
    horizontalOffsets.forEach(arr => arr.fill(1));
    for (let {row, column} of previousRoundedStones) {
      let cubeIndex = cubeStoneColumns[row].findIndex(v => v > column);
      let newColumn = cubeStoneColumns[row][cubeIndex] - horizontalOffsets[row][cubeIndex];
      roundedStones.push({row, column: newColumn});
      horizontalOffsets[row][cubeIndex] += 1;
    }

    if (!foundCycle) {
      let platformHash: bigint = BigInt("0b0");
      for (let stone of roundedStones) {
        platformHash += BigInt("0b1" + "0".repeat(stone.row * columns + stone.column));
      }
      if (previousHashes.includes(platformHash)) {
        let currentCycle = previousHashes.length;
        let previousCycle = previousHashes.lastIndexOf(platformHash);

        let matchingLoop = true;
        for (let cycleOffset = 1; cycleOffset < (currentCycle - previousCycle); cycleOffset++) {
          if (previousHashes[currentCycle - cycleOffset] != previousHashes[previousCycle - cycleOffset]) {
            matchingLoop = false;
            break;
          }
        }

        if (matchingLoop) {
          // we have a winner
          let desiredExtraCycles = (cycles - 1 - currentCycle) % (currentCycle - previousCycle) + 1;
          cycles = cycle + desiredExtraCycles;
          foundCycle = true;
        }
      }
      previousHashes.push(platformHash);
    }
    previousRoundedStones = roundedStones;
    roundedStones = [];
  }
  return regenerateBoard(tiles, previousRoundedStones);
}

export function tiltPlatformNorth(input: string): string {
  let lines = input.split("\n").map(s => s.trim()).filter(s => s.length != 0);
  if (lines.length <= 1) return input;

  let tiltedPlatform: string[][] = [];
  for (let row = 0; row < lines.length; row++) {
    let arr = Array(lines[0].length).fill("");
    tiltedPlatform.push(arr);
  }
  for (let column = 0; column < lines[0].length; column++) {
    let rowToFallInto = 0;
    for (let row = 0; row < lines.length; row++) {
      if (lines[row][column] == 'O' && row > rowToFallInto) {
        tiltedPlatform[rowToFallInto][column] = 'O';
        tiltedPlatform[row][column] = '.';
        rowToFallInto += 1;
      } else {
        tiltedPlatform[row][column] = lines[row][column];
      }

      if (tiltedPlatform[row][column] != '.') rowToFallInto = row + 1;
    }
  }

  return tiltedPlatform.map(row => row.join("")).join("\n");
}

export function totalLoadOnPlatform(input: string): number {
  let lines = input.split("\n").map(s => s.trim()).filter(s => s.length != 0);
  let length = lines.length;
  let sum = lines.reduce((total, line, i) => {
    let matches = line.match(/O/g)
    if (matches != null) return total + matches.length * (length - i);
    return total;
  }, 0);
  return sum;
}

function main(data: string) {
  console.log(totalLoadOnPlatform(cyclePlatform(data, 1e9)));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_14_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
