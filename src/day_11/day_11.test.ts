import { sumOfShortestPathLengths } from "./day_11";

test("null example", () => {
    expect(sumOfShortestPathLengths("#")).toBe(0);
})

test("oneline example", () => {
    expect(sumOfShortestPathLengths("#..#..#")).toBe(8e6 + 4) // each . is doubled
})

test("multiline example", () => {
    expect(sumOfShortestPathLengths(`#
    .
    #`)).toBe(1e6 + 1); // . is doubled
})

// test("full sample input", () => {
//     let sampleInput = `...#......
//     .......#..
//     #.........
//     ..........
//     ......#...
//     .#........
//     .........#
//     ..........
//     .......#..
//     #...#.....`;

//     expect(sumOfShortestPathLengths(sampleInput)).toBe(374);
// })