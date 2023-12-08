
function winningPlaysWithinTime(time: string, distance: string): number {
    let timeNum = parseInt(time)
    let distanceNum = parseInt(distance)
    
    let winningPlays = 0;
    for (let i = 0; i <= timeNum; i++) {
        if (i * (timeNum - i) > distanceNum) {
            winningPlays++;
        }
    }
    return winningPlays
}

export function productOfRecordBreakingPlays(input: string): number {
    let lines = input.split("\n");
    if (lines.length < 2) return -1;

    let times = lines[0].matchAll(/\d+/g)
    let distances = lines[1].matchAll(/\d+/g)
    if (!times || !distances) return -1;

    let time;
    let distance;
    let product = 1;
    while ((time = times.next()) !== null && (distance = distances.next()) !== null && !time.done && !distance.done) {
        if (time.value[0] && distance.value[0])
        product *= winningPlaysWithinTime(time.value[0], distance.value[0]);
    }
    return product;
}

function main(data: string)
{
    console.log(productOfRecordBreakingPlays(data));
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
