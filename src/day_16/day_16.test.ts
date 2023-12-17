import { largestNumberOfEnergizedTiles } from "./day_16";

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
    expect(largestNumberOfEnergizedTiles(sampleInput)).toBe(51);
})
