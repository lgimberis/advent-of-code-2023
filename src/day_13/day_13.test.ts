import { sumOfReflectionValues, differByPowerOfTwoOnly } from "./day_13";

test.each([
    [0, 1, true],
    [1, 2, false],
    [0, 2, true],
    [0, 4, true],
    [0, 8, true],
    [0, 512, true],
    [3, 4, false],
    [4, 6, true],
    [64, 65, true],
    [12, 6, false]
]) (`test %i and %i differ by power of two only`, (x: number, y: number, expected: boolean) => {
    expect(differByPowerOfTwoOnly(x, y)).toBe(expected);
});


test.each([
    ['#..#', 1],
    ['#\n.\n.\n#', 100]
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
    debugger;
    expect(sumOfReflectionValues(testInput)).toBe(300);
});

test('horizontal reflection', () => {
    let testInput = `
    #...##..#
    #....#..#
    ..##..###
    #####.##.
    #####.##.
    ..##..###
    #....#..#`;
    expect(sumOfReflectionValues(testInput)).toBe(100);
})

test('combined test', () => {
    let testInput = `

    #.##..##.
    ..#.##.#.
    ##......#
    ##......#
    ..#.##.#.
    ..##..##.
    #.#.##.#.
    
    #...##..#
    #....#..#
    ..##..###
    #####.##.
    #####.##.
    ..##..###
    #....#..#
    `
    expect(sumOfReflectionValues(testInput)).toBe(400);
})

test('pesky image 58', () => {
    let testInput = `
    ####.##
    .#....#
    ##.#.#.
    ..##.##
    ...#.##
    #####..
    .#.####
    .#.####
    #####..
    ...#.##
    ..##.##`;

    expect(sumOfReflectionValues(testInput)).toBe(1000);
})