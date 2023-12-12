function iterate(springSpec: string, springPattern: number[]): number {
  // Returns if the configuration exactly matches the given spring pattern
  let consecutiveHashes = 0;
  let hashStart = 0;
  let springPatternIndex = 0;
  for (let i = 0; i <= springSpec.length; i++) {
    if (i == springSpec.length || springSpec[i] == '.') {
      if (consecutiveHashes != 0) {
        if (consecutiveHashes != springPattern[springPatternIndex]) {
          return 0; // invalid
        }
        springPatternIndex++;
      }
      consecutiveHashes = 0;
      hashStart = i + 1;
    }
    else if (springSpec[i] == '?') {
      let prefix = springSpec.slice(hashStart, i);
      let postfix = springSpec.slice(i + 1);
      let passedPattern = springPattern.slice(springPatternIndex);
      return iterate(`${prefix}#${postfix}`, passedPattern)
        + iterate(`${prefix}.${postfix}`, passedPattern);
    }
    else {
      consecutiveHashes++;
    }
  }
  return springPatternIndex == springPattern.length ? 1 : 0;
}

export function sumOfCounts(input: string): number {
  let sum = 0;
  for (let line of input.split("\n").map(line => line.trim())) {
    let lineParts = line.split(" ");
    if (!lineParts || lineParts.length != 2) continue;

    let [springSpecification, springPattern] = lineParts;
    let nativeSpringPattern = springPattern.split(",").map(s => parseInt(s));

    // unfold
    springSpecification = Array(5).fill(springSpecification).join("?");
    nativeSpringPattern = Array(5).fill(nativeSpringPattern).flat();
    let count = iterate(springSpecification, nativeSpringPattern);
    console.log("Line %s done: %d", line, count);
  }
  return sum;
}

function main(data: string) {
  console.log(sumOfCounts(data));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_12_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
