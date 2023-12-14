export function cyclePlatform(input: string, cyles: number = 1): string {
  return "";
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
