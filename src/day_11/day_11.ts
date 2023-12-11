enum DataType {
  GALAXY = 0,
  SPACE = 1, // Any number above 0 corresponds to empty space with whatever size
}

function mapInputToData(char: string): DataType {
  switch (char) {
    case ".":
      return DataType.SPACE;
    case "#":
      return DataType.GALAXY;
    default:
      console.error("Input character not recognised: %s", char);
      return DataType.SPACE;
  }
}

function interpretInput(input: string): {data: DataType[], width: number, height: number} {
  let cleanedInput = input.split("\n").map(line => line.trim());
  let width = cleanedInput[0].length;
  let height = cleanedInput.length;
  let data: DataType[] = [];

  for (let char of cleanedInput.join("")) {
    data.push(mapInputToData(char));
  }
  return {data, width, height};
}

function expandSpace(data: DataType[], width: number, height: number): {rowIndices: number[], columnIndices: number[]} {
  let rowsToExpand = Array(height).fill(true);
  let columnsToExpand = Array(width).fill(true);

  for (let [index, v] of data.entries()) {
    let row = Math.floor(index / width);
    let column = index % width;

    if (v == DataType.GALAXY) {
      rowsToExpand[row] = false;
      columnsToExpand[column] = false;      
    }
  }

  function expandedIndices (toExpand: boolean[]): number[] {
    let indices: number[] = [];
    let currentIndex = 0;
    for (let isExpanded of toExpand) {
      indices.push(currentIndex);
      currentIndex += 1;
      if (isExpanded) {
        currentIndex += 1;
      }
    }
    return indices;
  }


  let rowIndices = expandedIndices(rowsToExpand);
  let columnIndices = expandedIndices(columnsToExpand);

  return {rowIndices, columnIndices};

}

export function sumOfShortestPathLengths(input: string): number {
  let {data, width, height} = interpretInput(input);

  let {rowIndices, columnIndices} = expandSpace(data, width, height);

  let sum = 0;
  for (let [index, char] of data.entries()) {
    if (char == DataType.GALAXY) {
      let startRow = Math.floor(index / width);
      let startColumn = index % width;
      for (let [otherIndex, otherChar] of (data.slice(index + 1)).entries()) {
        if (otherChar == DataType.GALAXY) {
          let endRow = Math.floor((otherIndex + index + 1) / width);
          let endColumn = (otherIndex + index + 1) % width;

          sum += Math.abs(rowIndices[endRow] - rowIndices[startRow]) 
          + Math.abs(columnIndices[endColumn] - columnIndices[startColumn])
        }
      }
    }
  }

  return sum;
}

function main(data: string) {
  console.log(sumOfShortestPathLengths(data));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_11_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
