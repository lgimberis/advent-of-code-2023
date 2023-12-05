import { sumPointsOfScratchcards, totalScratchcardsWon } from "./day_04";

test('no winning numbers', () => {
    expect(sumPointsOfScratchcards('Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'))
    .toBe(0);
})

test('1 winning number', () => {
    expect(sumPointsOfScratchcards('Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83'))
    .toBe(1);
})

test('4 winning numbers', () => {
    expect(sumPointsOfScratchcards('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'))
    .toBe(8);
})

test('full sample input', () => {
    let sampleInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
    Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
    Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
    Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
    Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

    expect(sumPointsOfScratchcards(sampleInput)).toBe(13);
})

test('example from extended input', () => {
    let sampleInput = 'Card 141: 85 31 79 11 41 81 46  9 10 70 | 38 85 77 30 70 92 10  9 46 86 45 79 19 97 31 74  5 67 15 41 73 66 11  8 14';
    expect(sumPointsOfScratchcards(sampleInput)).toBe(512);
})

// Part two

test('wins zero cards', () => {
    expect(totalScratchcardsWon('Card 1: 31 18 13 56 72 | 74 77 10 23 35 67 36 11')).toBe(0);
})

test('one match and wins one card', () => {
    let sampleInput = `Card 1: 41 48 83 86 17 | 83 85  6 31 18  9 49 53
    Card 2: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

    expect(totalScratchcardsWon(sampleInput)).toBe(1);
})

test('sample input', () => {
    let sampleInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
    Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
    Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
    Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
    Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

    expect(totalScratchcardsWon(sampleInput)).toBe(30);
})