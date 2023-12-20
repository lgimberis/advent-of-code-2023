import { productOfLowAndHighPulses } from "./day_20";

let allEndUpOff = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

let sampleInput = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

describe("part 1 tests", () => {
    test.each([
        [allEndUpOff, 32000000],
        //[sampleInput, 11687500]
    ])("press button 1000 times", (input, expected) => {
        expect(productOfLowAndHighPulses(input, 1000)).toBe(expected);
    })
});