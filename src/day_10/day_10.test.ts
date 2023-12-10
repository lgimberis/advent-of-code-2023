import { stepsToReachFurthestPipeInLoop } from "./day_10";

test("simple square loop without distractions", () => {
    let testInput = `.....
    .S-7.
    .|.|.
    .L-J.
    .....`;

    expect(stepsToReachFurthestPipeInLoop(testInput)).toBe(4);
})

test("simple square loop with distractions", () => {
    let testInput = `-L|F7
    7S-7|
    L|7||
    -L-J|
    L|-JF`;

    expect(stepsToReachFurthestPipeInLoop(testInput)).toBe(4);
})

test("more complicated loop without distractions", () => {
    let testInput = `..F7.
    .FJ|.
    SJ.L7
    |F--J
    LJ...`;

    expect(stepsToReachFurthestPipeInLoop(testInput)).toBe(8);
})

test("more complicated loop with distractions", () => {
    let testInput = `7-F7-
    .FJ|7
    SJLL7
    |F--J
    LJ.LJ`;

    expect(stepsToReachFurthestPipeInLoop(testInput)).toBe(8);
})