export function getStepsToReach(input: string, destination: string): number {
    return 0;
}

function main(data: string)
{
    console.log(getStepsToReach(data, "ZZZ"));
}

if (require.main === module)
{
    const fs = require("node:fs");

    fs.readFile("./day_08_data.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        main(data);
    });
}
