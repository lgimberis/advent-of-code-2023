import { tiltPlatformNorth, totalLoadOnPlatform } from "./day_14";

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