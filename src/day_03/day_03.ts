
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
    // Removes whitespace and newlines, and establishes dimensions of input data

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

function getAdjacentNumbersFromRow(index: number, cleanedInput: CleanData): number[] {
    // Returns the list of numbers that are 'adjacent' to index, whether on either side or through

    let [row, column] = getRowAndColumn(index, cleanedInput.columns);
    if (index < 0 || row > cleanedInput.rows - 1 || column > cleanedInput.columns - 1) {
        return [];
    }

    let adjacentNumbers: number[] = [];
    let addNumber = (n: RegExpMatchArray | null | string[]) => // Define helper which appends matches to adjacentNumbers
        n ? adjacentNumbers.push(parseInt(n[0])) : null;

    // Check if the value at index is a digit
    let centreNumber = cleanedInput.data[index].match(/\d/);

    // Check for digits to left and right of index
    let leftNumber = cleanedInput.data.slice(row * cleanedInput.columns, index).match(/\d+$/);
    let rightNumber = cleanedInput.data.slice(index + 1, (row + 1) * cleanedInput.columns).match(/^\d+/);

    if (centreNumber) {
        // Centre is digit -> combine with left and right for full value
        let str = centreNumber[0];
        if (leftNumber) str = leftNumber[0] + str;
        if (rightNumber) str = str + rightNumber[0];
        addNumber([str]);
    } else {
        // Centre is not digit -> possible numbers to left and right are separate
        addNumber(rightNumber);
        addNumber(leftNumber);
    }

    return adjacentNumbers;
}

function getGearValue(index: number, cleanedInput: CleanData): number {
    // Returns the value of the gear at this index
    // Returns 0 if it's not a 'gear'

    let centreLineNumbers = getAdjacentNumbersFromRow(index, cleanedInput);
    let aboveLineNumbers = getAdjacentNumbersFromRow(index - cleanedInput.columns, cleanedInput);
    let belowLineNumbers = getAdjacentNumbersFromRow(index + cleanedInput.columns, cleanedInput);

    let allNumbers = centreLineNumbers.concat(aboveLineNumbers).concat(belowLineNumbers);
    if (allNumbers.length != 2)
    {
        // By definition gears have two adjacent numbers exactly
        return 0;
    }
    
    return allNumbers[0] * allNumbers[1];
}

export function sumOfAllGearRatios(input: string): number {
    let cleanedInput = cleanInput(input);

    let gearRe = /\*/g;  // Finds all possible 'gears'
    let execArray: RegExpExecArray | null;
    let sum = 0;

    while((execArray = gearRe.exec(cleanedInput.data)) !== null) {
        let thisGearValue = getGearValue(execArray.index, cleanedInput);
        sum += thisGearValue;
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
