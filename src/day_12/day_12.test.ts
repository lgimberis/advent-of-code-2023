import { sumOfCounts } from "./day_12";

test.each([
    ['???.### 1,1,3', 1],
    ['.??..??...?##. 1,1,3', 4],
    ['?#?#?#?#?#?#?#? 1,3,1,6', 1],
    ['????.#...#... 4,1,1', 1],
    ['????.######..#####. 1,6,5', 4],
    ['?###???????? 3,2,1', 10],
]) ('test single lines', (input, expected) => {
    expect(sumOfCounts(input)).toBe(expected);
});
