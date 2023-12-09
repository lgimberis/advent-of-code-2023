export function sumOfExtrapolatedValues(input: string) {
  return 0;
}

function main(data: string) {
  console.log(sumOfExtrapolatedValues(data));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_09_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
