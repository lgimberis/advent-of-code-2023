export function tiltPlatformNorth(input: string): string {
  return "";
}

export function totalLoadOnPlatform(input: string): number {
  return 0;
}

function main(data: string) {
  console.log(totalLoadOnPlatform(tiltPlatformNorth(data)));
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
