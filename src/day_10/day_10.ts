function main(data: string) {
  console.log(data);
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_10_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
