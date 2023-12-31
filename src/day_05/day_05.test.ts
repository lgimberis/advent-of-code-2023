import { findLowestLocationNumber, interpretInput, createMap } from "./day_05"

test.each([
    [0, 0],
    [49, 49],
    [50, 52],
    [51, 53],
    [97, 99],
    [98, 50],
    [99, 51],
    [100, 100]
])('mapping works as expected', (input: number, expected: number) => {
    let mapDefinition = `seed-to-soil map:
    50 98 2
    52 50 48`
    let interpretedDefinition = interpretInput(mapDefinition);
    let map = createMap(interpretedDefinition['seed-to-soil map'])
    expect(map({start: input, end: input, offset: 0}).next()).toStrictEqual(
        {done: false, value: {start: input, end: input, offset: expected - input}}
    );
})

let simpleInput = `seeds: 50 1

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`


test('full sample input with single seed', () => {
    expect(findLowestLocationNumber(simpleInput)).toBe(20);
})


let sampleInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`


test('full sample input', () => {
    expect(findLowestLocationNumber(sampleInput)).toBe(46);
})