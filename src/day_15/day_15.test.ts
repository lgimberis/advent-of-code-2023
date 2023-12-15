import { hash, sumOfHashes, totalFocusingPower } from "./day_15";

test.each([
    ["HASH", 52],
    ["rn=1", 30],
    ["cm-", 253],
    ["qp=3", 97],
    // cm=2 becomes 47.
    // qp- becomes 14.
    // pc=4 becomes 180.
    // ot=9 becomes 9.
    // ab=5 becomes 197.
    // pc- becomes 48.
    // pc=6 becomes 214.
    // ot=7 becomes 231.
]) ("hashing %s gives %i", (input, expected) => {
    expect(hash(input)).toBe(expected);
});

test("sum of hashes in sample test", () => {
    expect(sumOfHashes("rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7")).toBe(1320);
});

// Part 2
test("simple focusing power", () => {
    expect(totalFocusingPower('rn=1')).toBe(1);
});

test("example focusing power", () => {
    let sampleInput = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
    expect(totalFocusingPower(sampleInput)).toBe(145);
});