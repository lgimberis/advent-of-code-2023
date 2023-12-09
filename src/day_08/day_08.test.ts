import { getStepsToReach, getStepsForGhosts } from "./day_08";

test("full sample input", () => {
  let sampleInput = `RL

    AAA = (BBB, CCC)
    BBB = (DDD, EEE)
    CCC = (ZZZ, GGG)
    DDD = (DDD, DDD)
    EEE = (EEE, EEE)
    GGG = (GGG, GGG)
    ZZZ = (ZZZ, ZZZ)`;

  expect(getStepsToReach(sampleInput, "ZZZ")).toBe(2);
});

test("second sample input", () => {
  let sampleInput = `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)`;

  expect(getStepsToReach(sampleInput, "ZZZ")).toBe(6);
});

test("simple steps for ghosts", () => {
  let sampleInput = `LLR

  AAA = (BBB, BBB)
  BBB = (AAA, ZZZ)
  ZZZ = (ZZZ, ZZZ)`;

  expect(getStepsForGhosts(sampleInput, /A$/, /Z$/)).toBe(6);
})

test("steps for ghosts sample input", () => {
  let sampleInput = `LR

  11A = (11B, XXX)
  11B = (XXX, 11Z)
  11Z = (11B, XXX)
  22A = (22B, XXX)
  22B = (22C, 22C)
  22C = (22Z, 22Z)
  22Z = (22B, 22B)
  XXX = (XXX, XXX)`;

  expect(getStepsForGhosts(sampleInput, /A$/, /Z$/)).toBe(6);
})