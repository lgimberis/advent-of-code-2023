function interepretInput(input: string) {
  let lines = input.split("\n").map(s => s.trim()).filter(s => s);
  let tiles: number[][] = []
  let rows = lines.length;
  if (rows == 0 || lines[0].length == 0) return { tiles, rows, columns: 0};
  let columns = lines[0].length;

  for (let [rowIndex, row] of lines.entries()) {
    tiles.push([]);
    for (let char of row) {
      let value = parseInt(char);
      if (value != value) console.error(`Parsed NaN on row ${rowIndex}: ${char}`)
      tiles[rowIndex].push(value);
    }
  }

  return { tiles, rows, columns }
}

export function leastHeatLoss(input: string): number {
  let { tiles, rows, columns } = interepretInput(input);
  let lowestCost: number[][] = []; // Corresponds to the lowest cost at which each tile is reached
  let threeTileRule: Record<string,number>[][] = [];
  for (let i = 0; i < rows; i++) {
    lowestCost.push(Array(columns).fill(Number.MAX_SAFE_INTEGER));
    threeTileRule.push([]);
    for (let j = 0; j < columns; j++) {
      threeTileRule[i].push({});
    }
  };
  threeTileRule[0][0] = { "-1,10": 0}
  
  function recalculateCost(sourceRow, sourceColumn) {
    // Recalculate costs of tiles surrounding this one
    // If any have a new lower cost, calculate those recursively
    //console.log(`Recalculating ${sourceRow},${sourceColumn}`)

    function isNewLowestCost(row, column, newDirection: number) {
      for (let [key, cost] of Object.entries(threeTileRule[sourceRow][sourceColumn])) {

        let newCost = cost + tiles[row][column];
        let [direction, distance] = key.split(",").map(s => parseInt(s));
        if (distance > 10 || (distance < 4 && direction != newDirection)) continue; // Move no more than 10 in one direction, and no less than 4

        let newKey = (direction == newDirection ? `${newDirection},${distance + 1}` : `${newDirection},1`);

        if (!threeTileRule[row][column].hasOwnProperty(newKey) || newCost < threeTileRule[row][column][newKey]) {
          threeTileRule[row][column][newKey] = newCost;
        }
      }
    }

    if (sourceRow > 0) isNewLowestCost(sourceRow - 1, sourceColumn, -columns);
    if (sourceRow < rows - 1) isNewLowestCost(sourceRow + 1, sourceColumn, columns);
    if (sourceColumn > 0) isNewLowestCost(sourceRow, sourceColumn - 1, -1);
    if (sourceColumn < columns - 1) isNewLowestCost(sourceRow, sourceColumn + 1, 1);
  }

  let previousHash = -1;
  let previousCosts: number[][] = [];
  let hash = 0;
  let confirmUnchanging = false;
  while (hash != previousHash) {
    previousHash = hash;
    previousCosts = [];
    if (confirmUnchanging) {
      for (let row = 0; row < rows; row++) {
        previousCosts.push([])
        for (let column = 0; column < columns; column++) {
          previousCosts[row].push(lowestCost[row][column]);
        }
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        recalculateCost(row, column);
      }
    }
    
    hash = 0;
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        lowestCost[row][column] = Math.min(...Object.values(threeTileRule[row][column]));
        hash = hash ^ lowestCost[row][column];
      }
    }
    if (hash == previousHash) {
      if (confirmUnchanging) {
        for (let row = 0; row < rows; row++) {
          for (let column = 0; column < columns; column++) {
            if (previousCosts[row][column] != lowestCost[row][column]) {
              previousHash--;
              break;
            }
          }
          confirmUnchanging = false;
        }
        previousHash++;
      }
      previousHash--;
      confirmUnchanging = true;
    }
  }

  //console.log(threeTileRule);
  //console.log(lowestCost.map(v => v.map(c => `${c}`.padStart(3)).join("")).join("\n"));
  return lowestCost[rows - 1][columns - 1];
}

function main(data: string) {
  console.log(leastHeatLoss(data));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_17_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
