interface Plot {
  isOpen: boolean;
  openNeighbours?: {row: number, column: number}[];
}

function interpretInput(input: string) {
  let lines = input.split("\n").map(line => line.trim()).filter(line => line);
  let rows = lines.length;
  let columns = lines[0].length;

  let map: Plot[][] = []

  let startRow = -1;
  let startColumn = -1;
  for (let row = 0; row < rows; row++) {
    map.push([]);
    for (let column = 0; column < columns; column++) {
      let tile = lines[row][column];
      if (tile == '#') {
        map[row].push({isOpen: false});
        continue;
      }

      if (tile == 'S') {
        startRow = row;
        startColumn = column;
      }

      function findNeighbours() {
        let neighbours = [];
        let candidates = [{row: row - 1, column}, {row: row + 1, column}, {row, column: column - 1}, {row, column: column + 1}];
        for (let {row, column} of candidates) {
          if (row >= 0 && row <= rows - 1 && column >= 0 && column <= columns - 1 && lines[row][column] != '#') {
            neighbours.push({row, column});
          }
        }
        return neighbours;
      }
      let plot = {
        isOpen: true,
        openNeighbours: findNeighbours()
      };
      map[row].push(plot);
    }
  }

  return { map, rows, columns, startRow, startColumn };
}

export function numberOfPlotsReachableAfterSteps(data: string, steps: number): number {
  let { map, rows, columns, startRow, startColumn } = interpretInput(data);

  const createIndex = (row, column) => row * columns + column;
  const undoIndex = (index) => ({row: Math.floor(index / columns), column: index % columns});

  let reachedTiles = new Set([createIndex(startRow, startColumn)]);
  for (let step = 0; step < steps; step++) {
    let newTiles = new Set([])
    for (let index of reachedTiles) {
      let {row, column} = undoIndex(index);
      for (let tile of map[row][column].openNeighbours) newTiles.add(createIndex(tile.row, tile.column));
    }
    reachedTiles = newTiles;
  }
  return reachedTiles.size;
}

function main(data: string) {
  console.log(numberOfPlotsReachableAfterSteps(data, 64));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_21_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
