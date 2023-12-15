export function hash(input: string): number {
  let hash = 0;
  for (let char of input) {
    if (char == "\n") continue;
    let ascii = char.charCodeAt(0);
    hash += ascii;
    hash *= 17;
    hash %= 256;
  }
  return hash;
}


export function sumOfHashes(input: string): number {
  let sum = 0;
  for (let line of input.split("\n")) {
    for (let word of line.split(",")) {
      sum += hash(word);
    }
  }
  return sum;
}

export function totalFocusingPower(input: string): number {
  let sum = 0;
  let boxes: Record<number, {label: string, focalLength: number}[]> = {}
  for (let line of input.split("\n")) {
    for (let word of line.split(",")) {
      if (word.includes("-")) {
        let label = word.slice(0, word.length - 1);
        let boxNumber = hash(label);
        // Go to the relevant box and remove the lens with that label if present in the box
        if (boxes.hasOwnProperty(boxNumber)) {
          let index = boxes[boxNumber].findIndex(lens => lens.label == label);
          if (index != -1) {
            boxes[boxNumber].splice(index, 1);
          }
        }
      }
      if (word.includes("=")) {
        let label = word.slice(0, word.length - 2);
        let boxNumber = hash(label);
        let focalLength = parseInt(word[word.length - 1]);

        if (!boxes.hasOwnProperty(boxNumber)) boxes[boxNumber] = [];
        
        let index = boxes[boxNumber].findIndex(lens => lens.label == label);
        if (index == -1) {
          // If there is no lens in the box with that label, add the lens to the box behind any labels in there
          boxes[boxNumber].push({label, focalLength});
        } else {
          // If there is a lens in the box with the same label, replace it
          boxes[boxNumber][index] = {label, focalLength};
        }

      }
    }
  }
  for (let [boxNumber, lenses] of Object.entries(boxes)) {
    for (let [lensIndex, lens] of lenses.entries()) {
      sum += (parseInt(boxNumber) + 1) * (lensIndex + 1) * lens.focalLength;
    }
  }
  return sum;
}

function main(data: string) {
  console.log(sumOfHashes(data));
  console.log(totalFocusingPower(data));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_15_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
