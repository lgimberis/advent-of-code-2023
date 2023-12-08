
export function totalWinnings(input: string): number {
    return 0;
}

function main(data: string)
{
    console.log(totalWinnings(data));
}

if (require.main === module)
{
    const fs = require('node:fs')

    fs.readFile("./day_07_data.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        main(data);
    });
}
