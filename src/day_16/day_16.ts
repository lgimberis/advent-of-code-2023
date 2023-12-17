export function numberOfEnergizedTiles(input: string): number {
  return 0;
}

function main(data: string) {
  console.log(numberOfEnergizedTiles(data));
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
