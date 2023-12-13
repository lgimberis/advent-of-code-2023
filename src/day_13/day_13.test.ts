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

test('another vertical reflection', () => {
    let testInput = `
    #.##..##
    ..#.##.#
    ##......
    ##......
    ..#.##.#
    ..##..##
    #.#.##.#`;
    expect(sumOfReflectionValues(testInput)).toBe(5);
})

test('horizontal reflection', () => {
    let testInput = `
    #...##..#
    #....#..#
    ..##..###
    #####.##.
    #####.##.
    ..##..###
    #....#..#`;
    expect(sumOfReflectionValues(testInput)).toBe(400);
})

test('another horizontal reflection', () => {
    let testInput = `
    #....#..#
    ..##..###
    #####.##.
    #####.##.
    ..##..###
    #....#..#`;
    expect(sumOfReflectionValues(testInput)).toBe(300);
})

test('combined test', () => {
    let testInput = `.##..##.
    .#.##.#.
    #......#
    #......#
    .#.##.#.
    .##..##.
    .#.##.#.
    
    #...##..#..
    #....#..#..
    ..##..###..
    #####.##...
    #####.##...
    ..##..###..
    #....#..#..`
    expect(sumOfReflectionValues(testInput)).toBe(404);
})