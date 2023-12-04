
export interface GameSetup {
    red: number;
    green: number;
    blue: number;
}

function isGameValid(splitSets: string[], gameSetup: GameSetup): boolean {
    for (let set of splitSets) {
        for (let colour of ['red', 'green', 'blue']) {
            let match = set.match(new RegExp(`(\\d+) ${colour}`));
            if (match && parseInt(match[1]) > gameSetup[colour]) {
                return false;
            }
        }
    }
    return true;
}

export function sumPossibleGameIds(gameOutcomes: string, gameSetup: GameSetup): number {
    let sum = 0;

    let games = gameOutcomes.split('\n');
    for (let game of games) {
        let gameValueMatch = game.match(/(?<=Game )\d+/);
        if (!gameValueMatch) {
            continue;
        }
        let gameValue = parseInt(gameValueMatch[0]);

        let sets = game.split(":")[1]; // assumes good input
        let splitSets = sets.split(";");

        if (isGameValid(splitSets, gameSetup)) {
            sum += gameValue;
        }
    }

    return sum;
}

export function sumPowersOfMinimumSetsOfCubes(gameOutcomes: string): number {
    let sum = 0;

    let games = gameOutcomes.split('\n');
    for (let game of games) {
        let splitGame = game.split(":");
        if (splitGame.length != 2) {
            continue;
        }
        let sets = splitGame[1];
        let splitSets = sets.split(";");

        let gameSetup = { red: 0, green: 0, blue: 0 };

        for (let set of splitSets) {
            for (let colour of ['red', 'green', 'blue']) {
                let match = set.match(new RegExp(`(\\d+) ${colour}`));
                if (match && parseInt(match[1]) > gameSetup[colour]) {
                    gameSetup[colour] = parseInt(match[1]);
                }
            }
        }

        sum += gameSetup.red * gameSetup.green * gameSetup.blue;
    }
    return sum;
}

if (require.main === module)
{
    const fs = require('node:fs')

    fs.readFile("./day_02_data.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(sumPossibleGameIds(data, {red: 12, green: 13, blue: 14}))
        console.log(sumPowersOfMinimumSetsOfCubes(data))
    });
}