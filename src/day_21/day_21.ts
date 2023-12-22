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
        let candidates = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (let [deltaRow, deltaColumn] of candidates) {
          if (lines[(rows + row + deltaRow) % rows][(columns + column + deltaColumn) % columns] != '#') {
            neighbours.push({row: deltaRow, column: deltaColumn});
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

  const createIndex = (row, column) => `${row},${column}`;
  const undoIndex = (index: string) => {
    let [row, column] = index.split(",").map(s => parseInt(s));
    return {row, column};
  }

  let reachedTiles = new Set([createIndex(startRow, startColumn)]);
  for (let step = 0; step < steps; step++) {
    let newTiles = new Set([])
    for (let index of reachedTiles) {
      let {row, column} = undoIndex(index);
      let mapRowIndex = (rows + (row % rows)) % rows;
      let mapColumnIndex = (columns + (column % columns)) % columns;
      for (let tile of map[mapRowIndex][mapColumnIndex].openNeighbours) newTiles.add(createIndex(row + tile.row, column + tile.column));
    }
    reachedTiles = newTiles;
  }
  return reachedTiles.size;
}

function main(data: string) {
  console.log(numberOfPlotsReachableAfterSteps(data, 64)); // p1, prints 3751
  console.log(numberOfPlotsReachableAfterSteps(data, 26501365)); 
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
