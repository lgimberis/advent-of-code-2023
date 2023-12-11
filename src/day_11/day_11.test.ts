import { sumOfShortestPathLengths } from "./day_11";

test("null example", () => {
    expect(sumOfShortestPathLengths("#")).toBe(0);
})

test("oneline example", () => {
    expect(sumOfShortestPathLengths("#..#..#")).toBe(5 + 5 + 10) // each . is doubled
})

test("multiline example", () => {
    expect(sumOfShortestPathLengths(`#
    .
    #`)).toBe(3); // . is doubled
})

test("full sample input", () => {
    let sampleInput = `...#......
    .......#..
    #.........
    ..........
    ......#...
    .#........
    .........#
    ..........
    .......#..
    #...#.....`;

    expect(sumOfShortestPathLengths(sampleInput)).toBe(374);
})