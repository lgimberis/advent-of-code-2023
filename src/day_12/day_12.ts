function iterate(springSpec: string, springPattern: number[]): number {
  // Returns if the configuration exactly matches the given spring pattern

  function getThreadHash(hashLength: number, patternIndex: number) {
    return hashLength * springSpec.length + patternIndex;
  }

  let oldThreads: {[hash: number]: number} = {0: 1};
  let threads: {[hash: number]: number} = {};
  for (let i = 0; i <= springSpec.length; i++) {
    threads = {};
    for (let [hashStr, copies] of Object.entries(oldThreads)) {
      let hash = parseInt(hashStr);
      let hashLength = Math.floor(hash / springSpec.length);
      let patternIndex = hash % springSpec.length;

      if ((i == springSpec.length || springSpec[i] == '?' || springSpec[i] == '.') && (hashLength == 0 || hashLength == springPattern[patternIndex])) {
        let hash = getThreadHash(0, patternIndex + (hashLength != 0 ? 1 : 0));
        if (threads.hasOwnProperty(hash)) {
          threads[hash] += copies;
        } else {
          threads[hash] = copies;
        }
      }
      if (i < springSpec.length && (springSpec[i] == '?' || springSpec[i] == '#')) {
        let hash = getThreadHash(hashLength + 1, patternIndex);
        if (threads.hasOwnProperty(hash)) {
          threads[hash] += copies;
        } else {
          threads[hash] = copies;
        }
      }
    }
    oldThreads = threads;
  }
  return oldThreads[springPattern.length] || 0;
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
    sum += count;
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
