function isValid(springSpec: string, springPattern: number[]): boolean {
  // Returns if the configuration exactly matches the given spring pattern
  let consecutiveHashes = 0;
  let observedPatterns: number[] = [];
  for (let i = 0; i < springSpec.length; i++) {
    if (springSpec[i] == '#') {
      consecutiveHashes++;
    } else {
      if (consecutiveHashes != 0) observedPatterns.push(consecutiveHashes);
      consecutiveHashes = 0;
    }
  }
  if (consecutiveHashes != 0) observedPatterns.push(consecutiveHashes);
  return observedPatterns.toString() == springPattern.toString();
}

function iterateCombinations(springSpec: string, springPattern: number[], index: number = 0): number {
  while(springSpec[index] != '?' && index < springSpec.length) index++;
  if (index >= springSpec.length) {
    if (isValid(springSpec, springPattern)) {
      return 1;
    }
    return 0;
  }

  let asDot = springSpec.slice(0, index) + '.' + springSpec.slice(index + 1);
  let asHash = springSpec.slice(0, index) + '#' + springSpec.slice(index + 1);

  let combinations = 0;
  combinations += iterateCombinations(asDot, springPattern, index + 1);
  combinations += iterateCombinations(asHash, springPattern, index + 1);
  return combinations;
}

function getNumberOfArrangements(springSpecification: string, springPattern: number[]): number {
  // Key idea #1: Any damaged spring that appears MUST be used and appear as one pattern or another
  return iterateCombinations(springSpecification, springPattern)
}

export function sumOfCounts(input: string): number {
  let sum = 0;
  for (let line of input.split("\n").map(line => line.trim())) {
    let lineParts = line.split(" ");
    if (!lineParts || lineParts.length != 2) continue;

    let [springSpecification, springPattern] = lineParts;
    let nativeSpringPattern = springPattern.split(",").map(s => parseInt(s));
    sum += getNumberOfArrangements(springSpecification, nativeSpringPattern);
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
