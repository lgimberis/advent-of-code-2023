export function hash(input: string): number {
  let hash = 0;
  return hash;
}


export function sumOfHashes(input: string): number {
  let sum = 0;
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
