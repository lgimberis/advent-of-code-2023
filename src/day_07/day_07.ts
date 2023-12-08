let allowedCards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

// Strongest: 5 of a kind, 4 of a kind, full house 32, 3 of a kind, 2 pairs, 1 pair, high card
// Same type => stronger first card is better, same first card => continue comparing cards

enum HandType {
    FIVE_OF_A_KIND,
    FOUR_OF_A_KIND,
    FULL_HOUSE,
    THREE_OF_A_KIND,
    TWO_PAIRS,
    ONE_PAIR,
    HIGH_CARD
}

interface Hand {
    cards: string;
    bid: number;
    type?: HandType;
    rank?: number;
}

function interpretInput(input: string): Hand[] {
    let hands: Hand[] = []
    for (let line of input.split("\n")) {
        let match = line.match(/(\S+)\s+(\S+)/)
        if (!match || match.length < 3) continue;

        let cards = match[1];
        let bid = parseInt(match[2]);
        if (bid != bid) continue; // ignore NaN

        hands.push({cards, bid});
    }
    return hands;
}

function determineHandType(cardCounts: number[]): HandType {
    if (cardCounts.includes(5)) {
        return HandType.FIVE_OF_A_KIND;
    } else if (cardCounts.includes(4)) {
        return HandType.FOUR_OF_A_KIND;
    } else if (cardCounts.includes(3)) {
        if (cardCounts.includes(2)) {
            return HandType.FULL_HOUSE;
        }
        return HandType.THREE_OF_A_KIND;
    } else if (cardCounts.includes(2)) {
        if (cardCounts.indexOf(2) != cardCounts.lastIndexOf(2)) {
            return HandType.TWO_PAIRS;
        }
        return HandType.ONE_PAIR;
    }
    return  HandType.HIGH_CARD;
}

function interpretHandType(hands: Hand[]): Hand[] {
    let updatedHands: Hand[] = []
    for (let hand of hands) {
        let handCounts: {[card: string]: number} = {}
        for (let card of hand.cards) {
            if (handCounts.hasOwnProperty(card)) {
                handCounts[card] += 1;
            } else {
                handCounts[card] = 1;
            }
        }
        let handCountsWithoutJokers = Object.entries(handCounts).filter(([key, value]) => (key != 'J'));
        let cardCounts = handCountsWithoutJokers.map(([key, value]) => value);
        if (cardCounts.length > 0) {
            cardCounts[cardCounts.indexOf(Math.max(...cardCounts))] += 5 - Object.values(cardCounts).reduce((sum, v) => sum + v, 0);
        } else {
            cardCounts = [5]; // What a load of jokers
        }
        
        updatedHands.push({...hand, type: determineHandType(cardCounts)});
    }
    return updatedHands;
}

function cardValue(card: string): number {
    switch (card) {
        case 'A':
            return 14;
        case 'K':
            return 13;
        case 'Q':
            return 12;
        case 'J':
            return 1;
        case 'T':
            return 10;
        default:
            return parseInt(card) ?? 0;
    }
}

function handSortingFunction(a: Hand, b: Hand): number {
    if (a.type != undefined && b.type != undefined && a.type != b.type) {
        return b.type - a.type;  //Reversed because lower type is 'better'
    }

    // Same type - go through cards in order
    for (let i = 0; i < Math.min(a.cards.length, b.cards.length); i++) {
        if (a.cards[i] != b.cards[i]) {
            return cardValue(a.cards[i]) - cardValue(b.cards[i]);
        }
    }
    return 0;
}

function determineRank(hands: Hand[]): Hand[] {
    hands = hands.sort(handSortingFunction).map((hand, i) => ({...hand, rank: i + 1}));
    return hands;
}

export function totalWinnings(input: string): number {
    let hands = interpretInput(input);
    hands = interpretHandType(hands); // adds HandType
    hands = determineRank(hands);

    let totalWinnings = 0;
    for (let hand of hands) {
        totalWinnings += hand.rank! * hand.bid;
    }
    return totalWinnings;
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
