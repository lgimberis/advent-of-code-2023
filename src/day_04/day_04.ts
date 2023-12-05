
export function sumPointsOfScratchcards(input: string): number {
    let cards = input.split("\n").map(c => c.trim());
    let totalScore = 0;
    for (let card of cards) {
        let match = card.match(/:\s+((\d+\s+)+)\|((\s+\d+)+)/)
        if (!match || match.length < 4) {
            continue;
        }
        let winningNumbers = match[1].trim().split(" ");
        let scratchcardNumbers = match[3].trim().split(" ");

        let matchingNumbers = 0;
        winningNumbers.forEach(n => n && scratchcardNumbers.includes(n) ? matchingNumbers += 1 : null)
        if (matchingNumbers > 0) {
            totalScore += 2 ** (matchingNumbers - 1);
        }
    }
    return totalScore;

}

export function totalScratchcardsWon(input: string): number {
    let cards = input.split("\n").map(c => c.trim());
    let cardCopies = {}
    let numberOfCards = 0;

    for (let card of cards) {
        let match = card.match(/Card\s+(\d+)\s*:(.+)\|(.+)/)
        if (!match || match.length < 4) {
            continue;
        }
        let cardNumber = match[1];
        let winningNumbers = match[2].trim().split(" ").filter(n => n);
        let scratchcardNumbers = match[3].trim().split(" ").filter(n => n);

        let matchingNumbers = 0;
        winningNumbers.forEach(n => scratchcardNumbers.includes(n) ? matchingNumbers += 1 : null)
        let copiesToAdd = cardCopies.hasOwnProperty(cardNumber) ? 1 + cardCopies[cardNumber] : 1;
        if (matchingNumbers > 0) {
            for (let i = 1; i <= matchingNumbers; i++)
            {
                let index = parseInt(cardNumber) + i;
                if (cardCopies.hasOwnProperty(index)) {
                    cardCopies[index] += copiesToAdd;
                } else {
                    cardCopies[index] = copiesToAdd;
                }
            }
        }
        numberOfCards += copiesToAdd;
    }
    return numberOfCards;
}

if (require.main === module)
{
    const fs = require('node:fs')

    fs.readFile("./day_04_data.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(sumPointsOfScratchcards(data));
        console.log(totalScratchcardsWon(data));
    });
}