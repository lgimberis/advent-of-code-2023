function interpretData(input: string): {horizontalMaps: number[][], verticalMaps: number[][]} {
  // Interprets input data as an array(images) of an array(lines) of numbers(map strings onto integers)
  let horizontalMaps: number[][] = [];
  let imageHorizontalMap: number[] = [];
  let imageVerticalMap: number[] = [];
  let verticalMaps: number[][] = [];


  function mapStringToNumber(line: string): number {
    let value = 0;
    let indexValue = 1;
    for (let i = 0; i < line.length; i++) {
      if (line[i] == '#') {
        value += indexValue;
      }
      indexValue *= 2;
    }
    return value;
  }

  let lines = input.split("\n");
  let indexValue = 1;
  for (let i = 0; i <= lines.length; i++) {
    if (i == lines.length || lines[i].trim().length == 0) {
      // new image or EOF
      if (imageHorizontalMap.length > 0) {
        horizontalMaps.push(imageHorizontalMap);
        verticalMaps.push(imageVerticalMap);
        imageHorizontalMap = [];
        imageVerticalMap = [];
        indexValue = 1;
      }
      continue;
    }
    let line = lines[i].trim();
    imageHorizontalMap.push(mapStringToNumber(line));

    for (let j = 0; j < line.length; j++) {
      if (imageVerticalMap.length < j + 1) imageVerticalMap.push(0);
      if (line[j] == '#') {
        imageVerticalMap[j] += indexValue;
      }
    }
    indexValue *= 2;
  }
  return {horizontalMaps, verticalMaps};
}

export function differByPowerOfTwoOnly (x, y)
{
  let uncommonBits = x ^ y;
  // If x is a power of 2, then x & x - 1 = 0
  return (uncommonBits & uncommonBits - 1) == 0;
}

export function sumOfReflectionValues(input: string): number {
  let {horizontalMaps, verticalMaps} = interpretData(input);

  function hasViableReflection(map: number[]): {isReflected: boolean, reflectionIndex: number} {
    let isReflected = false;
    let reflectionIndex = 0;
    let foundSmudge = false;

    for (let row = 0; row < map.length - 1; row++) {
      if (differByPowerOfTwoOnly(map[row], map[row + 1])) {
        // Found prospective row
        foundSmudge = map[row] != map[row + 1];
        isReflected = true;
        reflectionIndex = row;
        let offsetMax = Math.min(map.length - 2 - row, row) // Either 0 or rowData.length, depends on whether row was closer to 0 or 
        for (let offset = 1; offset <= offsetMax; offset++) {
          if (!differByPowerOfTwoOnly(map[row - offset], map[row + 1 + offset])) {
            // Not different by a power of two -> will never be a smudge/reflection
            isReflected = false;
          } else {
            if (map[row + 1 + offset] != map[row - offset]) {
              // Due to a smudge
              if (foundSmudge) isReflected = false; // If we already used our one 'smudge', this won't be a reflection
              foundSmudge = true;
            }
          }
        }
        if (isReflected && foundSmudge) return {isReflected: true, reflectionIndex};
      }
    }
    return {isReflected: false, reflectionIndex};
  }

  let sum = 0;
  for (let imageIndex = 0; imageIndex < horizontalMaps.length; imageIndex++) {
    let verticalReflection = hasViableReflection(verticalMaps[imageIndex]);
    if (verticalReflection.isReflected) {
      sum += verticalReflection.reflectionIndex + 1;
      continue;
    }
    let horizontalReflection = hasViableReflection(horizontalMaps[imageIndex]);
    if (horizontalReflection.isReflected) {
      sum += (horizontalReflection.reflectionIndex + 1) * 100;
    }
  }
  return sum;
}

function main(data: string) {
  console.log(sumOfReflectionValues(data));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_13_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
