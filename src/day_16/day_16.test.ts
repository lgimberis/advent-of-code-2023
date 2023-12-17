import { numberOfEnergizedTiles } from "./day_16";

let sampleInput = `.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`;

test("sample energized tiles", () => {
    expect(numberOfEnergizedTiles(sampleInput)).toBe(46);
})