import { stepsToReachFurthestPipeInLoop, tilesEnclosedBy } from "./day_10";

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

// Part 2

test("find tiles enclosed by, simple case", () => {
    let testInput = `
    ...........
    .S-------7.
    .|F-----7|.
    .||.....||.
    .||.....||.
    .|L-7.F-J|.
    .|..|.|..|.
    .L--J.L--J.
    ...........`;
    
    expect(tilesEnclosedBy(testInput)).toBe(4);
})

test("find tiles enclosed by, another simple case", () => {
    let testInput = `
    ..........
    .S------7.
    .|F----7|.
    .||....||.
    .||....||.
    .|L-7F-J|.
    .|..||..|.
    .L--JL--J.
    ..........`;

    expect(tilesEnclosedBy(testInput)).toBe(4);
})

test("tiles enclosed in larger example", () => {
    let testInput = `
    .F----7F7F7F7F-7....
    .|F--7||||||||FJ....
    .||.FJ||||||||L7....
    FJL7L7LJLJ||LJ.L-7..
    L--J.L7...LJS7F-7L7.
    ....F-J..F7FJ|L7L7L7
    ....L7.F7||L7|.L7L7|
    .....|FJLJ|FJ|F7|.LJ
    ....FJL-7.||.||||...
    ....L---J.LJ.LJLJ...`;

    expect(tilesEnclosedBy(testInput)).toBe(8);
})

test("tiles enclosed in another example", () => {
    let testInput = `
    FF7FSF7F7F7F7F7F---7
    L|LJ||||||||||||F--J
    FL-7LJLJ||||||LJL-77
    F--JF--7||LJLJ7F7FJ-
    L---JF-JLJ.||-FJLJJ7
    |F|F-JF---7F7-L7L|7|
    |FFJF7L7F-JF7|JL---7
    7-L-JL7||F7|L7F-7F7|
    L.L7LFJ|||||FJL7||LJ
    L7JLJL-JLJLJL--JLJ.L`;

    expect(tilesEnclosedBy(testInput)).toBe(10);
})