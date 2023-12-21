export function numberOfPlotsReachableAfterSteps(data: string, steps: number): number {
  return 0;
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
