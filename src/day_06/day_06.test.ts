import { productOfRecordBreakingPlays } from "./day_06";

test('first race', () => {
    let sampleInput = `Time:      7
    Distance:  9`
    expect(productOfRecordBreakingPlays(sampleInput)).toBe(4);
})

test('full sample input', () => {
    let sampleInput = `Time:      7  15   30
    Distance:  9  40  200`;
    expect(productOfRecordBreakingPlays(sampleInput)).toBe(288);
})