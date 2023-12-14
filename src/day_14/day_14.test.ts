import { tiltPlatformNorth, cyclePlatform, totalLoadOnPlatform } from "./day_14";

test("tilting platform works", () => {
    let sampleInput = `O....#....
    O.OO#....#
    .....##...
    OO.#O....O
    .O.....O#.
    O.#..O.#.#
    ..O..#O..O
    .......O..
    #....###..
    #OO..#....`;
    
    let expected = `OOOO.#.O..
    OO..#....#
    OO..O##..O
    O..#.OO...
    ........#.
    ..#....#.#
    ..O..#.O.O
    ..O.......
    #....###..
    #....#....`

    expect(tiltPlatformNorth(sampleInput).replace("\n","").replaceAll(" ","")).toBe(expected.replace("\n","").replaceAll(" ",""));
});

test("total load on platform fits sample", () => {
    let tiltedInput = `OOOO.#.O..
    OO..#....#
    OO..O##..O
    O..#.OO...
    ........#.
    ..#....#.#
    ..O..#.O.O
    ..O.......
    #....###..
    #....#....`;

    expect(totalLoadOnPlatform(tiltedInput)).toBe(136);
});

// Part two

let sampleInput = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

let afterFirstCycle = `.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`;

let afterSecondCycle = `.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#..OO###..
#.OOO#...O`;

let afterThirdCycle = `.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#...O###.O
#.OOO#...O`

test.each([
    [sampleInput, afterFirstCycle],
    [afterFirstCycle, afterSecondCycle],
    [afterSecondCycle, afterThirdCycle]
]) ('cycle once', (input, expected) => {
    expect(cyclePlatform(input).replaceAll("\n","").replaceAll(" ","")).toBe(expected.replaceAll("\n","").replaceAll(" ",""));
});

test("cycle 3 times directly", () => {
    expect(cyclePlatform(sampleInput, 3)).toBe(afterThirdCycle);
})

test("load after cycling 1e9 times", () => {
    expect(totalLoadOnPlatform(cyclePlatform(sampleInput, 1e9))).toBe(64);
})

