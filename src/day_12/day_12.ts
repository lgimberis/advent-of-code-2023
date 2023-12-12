function iterate(springConditionRecord: string, damagedSpringGroupSizes: number[]): number {
  // Returns if the configuration exactly matches the given spring pattern

  function getThreadHash(hashLength: number, patternIndex: number) {
    return hashLength * springConditionRecord.length + patternIndex;
  }

  let oldThreads: {[hash: number]: number} = {0: 1};
  let threads: {[hash: number]: number} = {};
  for (let i = 0; i <= springConditionRecord.length; i++) {
    threads = {};
    for (let [hashStr, copies] of Object.entries(oldThreads)) {
      let hash = parseInt(hashStr);
      let consecutiveDamagedSprings = Math.floor(hash / springConditionRecord.length);
      let damagedGroupIndex = hash % springConditionRecord.length;

      if ((i == springConditionRecord.length || springConditionRecord[i] == '?' || springConditionRecord[i] == '.') && (consecutiveDamagedSprings == 0 || consecutiveDamagedSprings == damagedSpringGroupSizes[damagedGroupIndex])) {
        let hash = getThreadHash(0, damagedGroupIndex + (consecutiveDamagedSprings != 0 ? 1 : 0));
        if (threads.hasOwnProperty(hash)) {
          threads[hash] += copies;
        } else {
          threads[hash] = copies;
        }
      }
      if (i < springConditionRecord.length && (springConditionRecord[i] == '?' || springConditionRecord[i] == '#')) {
        let hash = getThreadHash(consecutiveDamagedSprings + 1, damagedGroupIndex);
        if (threads.hasOwnProperty(hash)) {
          threads[hash] += copies;
        } else {
          threads[hash] = copies;
        }
      }
    }
    oldThreads = threads;
  }
  return oldThreads[damagedSpringGroupSizes.length] || 0;
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
    console.debug("Line %s done: %d", line, count);
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
