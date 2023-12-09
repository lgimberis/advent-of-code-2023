import { sumOfExtrapolatedValues } from "./day_09";


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
