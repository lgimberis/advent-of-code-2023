import { sumOfCounts } from "./day_12";

test.each([
    ['???.### 1,1,3', 1],
    ['.??..??...?##. 1,1,3', 16384],
    ['?#?#?#?#?#?#?#? 1,3,1,6', 1],
    ['????.#...#... 4,1,1', 16],
    ['????.######..#####. 1,6,5', 2500],
    ['?###???????? 3,2,1', 506250],
]) ('test single lines', (input, expected) => {
    debugger;
    expect(sumOfCounts(input)).toBe(expected);
});
