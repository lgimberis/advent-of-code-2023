import { sumOfExtrapolatedValues, sumOfBackwardsExtrapolatedValues } from "./day_09";


test("simple input", () => {
    expect(sumOfExtrapolatedValues("0 3")).toBe(6);
})

test("growing input", () => {
    expect(sumOfExtrapolatedValues("0 1 3")).toBe(6);
});

test("full sample input", () => {
  let sampleInput = `0 3 6 9 12 15
  1 3 6 10 15 21
  10 13 16 21 30 45`;

  expect(sumOfExtrapolatedValues(sampleInput)).toBe(114);
});

test("test", () => {
    let sampleInput = "-4 12 56 141 280 486 772 1151 1636 2240 2976 3857 4896 6106 7500 9091 10892 12916 15176 17685 20456";

    expect(sumOfExtrapolatedValues(sampleInput)).toBe(23502);
})

// Part 2

test("simple input backwards", () => {
    expect(sumOfBackwardsExtrapolatedValues("0 3")).toBe(-3);
})

test("growing input backwards", () => {
    expect(sumOfBackwardsExtrapolatedValues("0 1 3")).toBe(0);
});

test("full sample input backwards", () => {
  let sampleInput = `0 3 6 9 12 15
  1 3 6 10 15 21
  10 13 16 21 30 45`;

  expect(sumOfBackwardsExtrapolatedValues(sampleInput)).toBe(2);
});
