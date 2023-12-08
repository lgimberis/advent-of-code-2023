import { getStepsToReach } from "./day_08";

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
})