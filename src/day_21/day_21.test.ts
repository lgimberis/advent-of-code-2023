import { numberOfPlotsReachableAfterSteps } from "./day_21";

let exampleInput = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

describe('part 1 tests', () => {

    test.each([
        [1, 2],
        [2, 4],
        [3, 6],
        [6, 16]
    ])("given example with %i steps", (steps, expected) => {
        expect(numberOfPlotsReachableAfterSteps(exampleInput, steps)).toBe(expected);
    })
});