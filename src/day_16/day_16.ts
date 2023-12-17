function interpretInput(input: string): { tiles: Record<number, string>, rows: number, columns: number } {
  const lines = input.split("\n").map(s => s.trim()).filter(s => s);
  const tiles: Record<number, string> = {};
  const rows = lines.length;
  if (lines.length == 0) return { tiles, rows, columns: 0 };
  const columns = lines[0].length;
  let index = 0;
  for (let line of lines) {
    if (line.length != columns) console.log("Inconsistent line length ", line.length)
    for (let char of line) {
      if (char != ".") {
        tiles[index] = char;
      }
      index++;
    }
  }
  return { tiles, rows, columns };
}

function determineStep(char: string, step: number, columns: number): number[] {
  switch (char) {
    case "\\":
      // 1 -> columns, columns -> 1, -1 -> -columns, -columns -> -1
      return [ Math.sign(step) * (1 + columns - Math.abs(step)) ];
    case "/":
      // 1 -> -columns, -columns -> 1, columns -> -1, -1 -> columns
      return [ Math.sign(step) * (Math.abs(step) - 1 - columns) ]; // columns - 1 - step // -[1 + columns - step
    case "|":
      if (Math.abs(step) == 1) {
        return [ columns, -columns ];
      }
      break;
    case "-":
      if (Math.abs(step) != 1) {
        return [ 1, -1 ];
      }
      break;
    default:
      break;
  }
  return [ step ];
}

export function largestNumberOfEnergizedTiles(input: string): number {
  const { tiles, rows, columns } = interpretInput(input);

  let mostEnergizedTiles = 0;
  // From above / below
  for (let i = 0; i < columns; i++) {
    mostEnergizedTiles = Math.max(mostEnergizedTiles, numberOfEnergizedTiles(tiles, rows, columns, columns, i));
    mostEnergizedTiles = Math.max(mostEnergizedTiles, numberOfEnergizedTiles(tiles, rows, columns, -columns, i + (rows - 1) * columns));
  }
  // From sides
  for (let i = 0; i < rows; i++) {
    mostEnergizedTiles = Math.max(mostEnergizedTiles, numberOfEnergizedTiles(tiles, rows, columns, 1, i * columns));
    mostEnergizedTiles = Math.max(mostEnergizedTiles, numberOfEnergizedTiles(tiles, rows, columns, -1, columns - 1 + i * columns));
  }
  return mostEnergizedTiles;
}

export function numberOfEnergizedTiles(tiles: Record<number, string>, rows: number, columns: number, step: number, index: number): number {
  const isTileEnergized: boolean[] = Array(rows * columns).fill(false);

  const threads = [{step, index}];
  const previousThreads: Record<number, number[]> = {};
  for (let key of Object.keys(tiles)) {
    previousThreads[key] = [];
  }
  while (threads.length > 0) {
    let { step, index } = threads.pop();
    while (index >= 0 && index < rows * columns) {
      isTileEnergized[index] = true;
      if (tiles.hasOwnProperty(index)) {
        // If not a blank tile

        // Determine where this beam of light gets reflected
        let indices = determineStep(tiles[index], step, columns);
        step = indices[0];

        if (indices.length == 2) {
          // If split, determine where the other split beam goes
          if (!previousThreads[index].includes(indices[1]) && (indices[1] != 1 || index % columns < columns - 1) && (indices[1] != -1 || index % columns > 0)) {
            previousThreads[index].push(indices[1]);
            threads.push({step: indices[1], index: index + indices[1]});
          }
        }

        if (!previousThreads[index].includes(step)) {
          previousThreads[index].push(step);
        } else {
          break;
        }
      }

      // Protect against wrapping over rows
      if ((index % columns == columns - 1 && step == 1) || (step == -1 && index % columns == 0)) {
        break;
      }
      index += step;
    }
  }

  return isTileEnergized.reduce((sum, tile) => (tile ? sum + 1 : sum), 0);
}

function main(data: string) {
  console.log(largestNumberOfEnergizedTiles(data));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_16_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
