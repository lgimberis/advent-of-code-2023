import { sumOfReflectionValues } from "./day_13";

test.each([
    ['#..#', 2],
    ['#\n.\n.\n#', 200]
]) (`simple test`, (input: string, expected: number) => {
    expect(sumOfReflectionValues(input)).toBe(expected);
});

test('vertical reflection', () => {
    let testInput = `#.##..##.
    ..#.##.#.
    ##......#
    ##......#
    ..#.##.#.
    ..##..##.
    #.#.##.#.`;
    expect(sumOfReflectionValues(testInput)).toBe(5);
});

test('horizontal reflection', () => {
    let testInput = `#...##..#
    #....#..#
    ..##..###
    #####.##.
    #####.##.
    ..##..###
    #....#..#`;
    expect(sumOfReflectionValues(testInput)).toBe(400);
})