export function hash(input: string): number {
  let hash = 0;
  for (let char of input) {
    if (char == "\n") continue;
    let ascii = char.charCodeAt(0);
    hash += ascii;
    hash *= 17;
    hash %= 256;
  }
  return hash;
}


export function sumOfHashes(input: string): number {
  let sum = 0;
  for (let line of input.split("\n")) {
    for (let word of line.split(",")) {
      sum += hash(word);
    }
  }
  return sum;
}

function main(data: string) {
  console.log(sumOfHashes(data));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_15_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
