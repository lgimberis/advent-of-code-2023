
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

export function parseString(inputString: string): number {
    const forwardRe = /^.*?(\d)/mg;  // m - multiline, to grab the first number on every line
    const backwardRe = /.*(\d).*$/mg;

    let forwardMatch = inputString.matchAll(forwardRe);
    let backwardMatch = inputString.matchAll(backwardRe);

    let sum = 0;
    for (let firstNumber of forwardMatch)
    {
        sum += 10 * parseInt(firstNumber[1]);
    }

    for (let lastNumber of backwardMatch)
    {
        sum += parseInt(lastNumber[1]);
    }

    return sum;
}

const fs = require('node:fs')

fs.readFile("./day_01_a_data.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(parseString(data))
});
