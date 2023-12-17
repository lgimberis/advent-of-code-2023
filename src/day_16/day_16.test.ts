import { numberOfEnergizedTiles } from "./day_16";

let sampleInput = String.raw`.|...\....
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
