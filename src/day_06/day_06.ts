
export function productOfRecordBreakingPlays(input: string) {
    return 0;
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
