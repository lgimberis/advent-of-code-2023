import { totalWinnings} from "./day_07";

test('single input', () => {
    expect(totalWinnings('32T3K 100')).toBe(100);
})

test('other single input', () => {
    expect(totalWinnings('KTJJT 220')).toBe(220);
})

test('full sample input', () => {
    let sampleInput = `32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483`;

    expect(totalWinnings(sampleInput)).toBe(6440);
})