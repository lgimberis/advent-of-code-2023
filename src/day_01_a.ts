
/*

The newly-improved calibration document consists of lines of text; 
each line originally contained a specific calibration value that the 
Elves now need to recover. On each line, the calibration value can be 
found by combining the first digit and the last digit (in that order) 
to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet

In this example, the calibration values of these four lines are 12, 38, 15, and 77. 
Adding these together produces 142.

*/

function parseMatchedNumber(match: string): number {
    switch (match) {
        case "one":
            return 1
        case "two":
            return 2
        case "three":
            return 3
        case "four":
            return 4
        case "five":
            return 5
        case "six":
            return 6
        case "seven":
            return 7
        case "eight":
            return 8
        case "nine":
            return 9
        default:
            return parseInt(match);
    }
}

export function parseString(inputString: string): number {
    const acceptableCharacters = '\\d|one|two|three|four|five|six|seven|eight|nine'
    const forwardRe = new RegExp(`^.*?(${acceptableCharacters})`, 'mg');  // m - multiline, to grab the first number on every line
    const backwardRe = new RegExp(`.*(${acceptableCharacters}).*$`, 'mg');

    let forwardMatch = inputString.matchAll(forwardRe);
    let backwardMatch = inputString.matchAll(backwardRe);

    let sum = 0;
    for (let firstNumber of forwardMatch)
    {
        sum += 10 * parseMatchedNumber(firstNumber[1]);
    }

    for (let lastNumber of backwardMatch)
    {
        sum += parseMatchedNumber(lastNumber[1]);
    }

    return sum;
}

if (require.main === module)
{
    const fs = require('node:fs')

    fs.readFile("./day_01_a_data.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(parseString(data))
    });
}
