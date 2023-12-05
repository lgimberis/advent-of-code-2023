
function getRowAndColumn(index: number, columns: number): [row: number, column: number] {
    let row = Math.floor(index / columns);
    let column = index % columns;
    return [row, column]
}

function updateMask(array: RegExpExecArray, mask: Array<boolean>, numberOfLines: number, length: number): Array<boolean> {
    let [row, column] = getRowAndColumn(array.index, length);

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

interface CleanData {
    data: string;
    rows: number;
    columns: number;
}

function cleanInput(input: string): CleanData {
    let trimmedInput = input.split("\n").map(s => s.trim());
    let rows = trimmedInput.length;
    let columns = 0;
    if (rows > 0) {
        columns = trimmedInput[0].length;
    }
    let data = trimmedInput.join("");

    return {data, rows, columns}
}

export function sumOfAllPartNumbers(input: string): number {
    let cleanedInput = cleanInput(input);
    let onelineTrimmedInput = cleanedInput.data;
    let numberOfLines = cleanedInput.rows;
    let length = cleanedInput.columns;


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

function getAdjacentNumbersFromRow(index: number, cleanedInput: CleanData, {row, column}): number[] {
    if (index < 0 || row > cleanedInput.rows - 1 || column > cleanedInput.columns - 1) {
        return [];
    }

    let numberToLeftRe = /\d+$/
    let numberToRightRe = /^\d+/

    let adjacentNumbers: number[] = []
    let addNumber = (n: RegExpMatchArray | null | string[]) => n ? adjacentNumbers.push(parseInt(n[0])) : null

    // Check above and below
    let centreNumber = cleanedInput.data[index].match(/\d/)

    // If no digit above/below, check both diagonals above/below
    let leftNumber = cleanedInput.data.slice(row * cleanedInput.columns, index).match(numberToLeftRe);
    let rightNumber = cleanedInput.data.slice(index + 1, (row + 1) * cleanedInput.columns).match(numberToRightRe);
    if (centreNumber) {
        let str = centreNumber[0]
        if (leftNumber) str = leftNumber[0] + str
        if (rightNumber) str = str + rightNumber[0]
        addNumber([str])
    } else {
        addNumber(leftNumber);
        addNumber(rightNumber)
    }

    return adjacentNumbers;
}

function gearValue(index: number, cleanedInput: CleanData): number {
    let [row, column] = getRowAndColumn(index, cleanedInput.columns)

    // Check left and right
    let centre = getAdjacentNumbersFromRow(index, cleanedInput, {row, column});
    let above = getAdjacentNumbersFromRow(index - cleanedInput.columns, cleanedInput, {row: (row - 1), column});
    let below = getAdjacentNumbersFromRow(index + cleanedInput.columns, cleanedInput, {row: (row + 1), column});

    let allNumbers = centre.concat(above).concat(below);
    if (allNumbers.length != 2)
    {
        return 0;
    }
    
    return allNumbers[0] * allNumbers[1];
}

export function sumOfAllGearRatios(input: string): number {
    let cleanedInput = cleanInput(input);

    let gearRe = /\*/g;
    let execArray: RegExpExecArray | null;
    let sum = 0;

    while((execArray = gearRe.exec(cleanedInput.data)) !== null) {
        sum += gearValue(execArray.index, cleanedInput);
    }

    return sum;
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
        console.log(sumOfAllGearRatios(data));
    });
}
