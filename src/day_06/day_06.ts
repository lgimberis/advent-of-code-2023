
function recordBreakingPlaysWithinTime(time: number, distance: number): number {
    let winningPlays = 0;
    for (let buttonHeldFor = 0; buttonHeldFor <= time; buttonHeldFor++) {
        let velocity = buttonHeldFor;
        let remainingTime = time - buttonHeldFor;
        if (velocity * remainingTime > distance) {
            winningPlays++;
        }
    }
    return winningPlays
}

function interpretInput(input: string): {times: number[], distances: number[]} {
    let lines = input.split("\n");
    if (lines.length < 2) throw Error('Expect two lines')

    let timeMatch = lines[0].match(/\d+/g)
    let distanceMatch = lines[1].match(/\d+/g)
    if (!timeMatch || !distanceMatch) throw Error('Expect times and distances to have values defined')

    let times = timeMatch.map(t => parseInt(t));
    let distances = distanceMatch.map(d => parseInt(d));

    return {times, distances}
}

export function productOfRecordBreakingPlays(input: string): number {
    let {times, distances} = interpretInput(input);

    let product = 1;
    for (let i = 0; i < Math.min(times.length, distances.length); i++) {
        product *= recordBreakingPlaysWithinTime(times[i], distances[i]);
    }
    return product;
}

export function recordBreakingPlaysInKernedInput(input: string): number {
    let {times, distances} = interpretInput(input);

    let actualKernedTime = parseInt(times.map(t => t.toString()).join(""))
    let actualKernedDistance = parseInt(distances.map(d => d.toString()).join(""))

    return recordBreakingPlaysWithinTime(actualKernedTime, actualKernedDistance);
}

function main(data: string)
{
    console.log(recordBreakingPlaysInKernedInput(data));
}

if (require.main === module)
{
    const fs = require('node:fs')

    fs.readFile("./day_06_data.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        main(data);
    });
}
