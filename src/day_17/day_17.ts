export function leastHeatLoss(input: string): number {
  return 0;
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
