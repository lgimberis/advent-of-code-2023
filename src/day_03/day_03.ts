
function updateMask(array: RegExpExecArray, mask: Array<boolean>, numberOfLines: number, length: number): Array<boolean> {
    let row = Math.floor(array.index / length);
    let column = array.index % length;

    if (column > 0) mask[array.index - 1] = true;
    if (column < length - 1) mask[array.index + 1] = true;
    if (row > 0) {
        mask[array.index - length] = true
        if (column > 0) mask[array.index - length - 1] = true;
        if (column < length - 1) mask[array.index - length + 1] = true;
    }
    if (row < numberOfLines - 1) {
        mask[array.index + length] = true;
        if (column > 0) mask[array.index + length - 1] = true;
        if (column < length - 1) mask[array.index + length + 1] = true;
    }
    return mask;
}

export function sumOfAllPartNumbers(input: string): number {
    let trimmedInput = input.split("\n").map(s => s.trim());
    let numberOfLines = trimmedInput.length;
    if (numberOfLines == 0) {
        return 0;
    }
    let length = trimmedInput[0].length;
    let onelineTrimmedInput = trimmedInput.join("");


    let mask = new Array(length * numberOfLines).fill(false);
    let symbolRe = /[^.\d]/g

    let array: RegExpExecArray | null;
    while ((array = symbolRe.exec(onelineTrimmedInput)) !== null) {
        mask = updateMask(array, mask, numberOfLines, length)
    }

    // Find all numbers and see if any of their indices indicate they should be parts
    let digitRe = /\d+/g
    let sum = 0;
    while ((array = digitRe.exec(onelineTrimmedInput)) !== null) {
        let value = parseInt(array[0]);
        let indices = Array.from({length: array[0].length}, (v, k) => k + array!.index)
        if (indices.some((v) => mask[v])) {
            sum += value;
        }
    }
    return sum;
}

export function sumOfAllGearRatios(input: string): number {
    return 0;
}

if (require.main === module)
{
    const fs = require('node:fs')

    fs.readFile("./day_03_data.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(sumOfAllPartNumbers(data));
    });
}
