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

describe('part 2 tests', () => {
    /*     
    In exactly 6 steps, he can still reach 16 garden plots.
    In exactly 10 steps, he can reach any of 50 garden plots.
    In exactly 50 steps, he can reach 1594 garden plots.
    In exactly 100 steps, he can reach 6536 garden plots.
    In exactly 500 steps, he can reach 167004 garden plots.
    In exactly 1000 steps, he can reach 668697 garden plots.
    In exactly 5000 steps, he can reach 16733044 garden plots.
    */
    test.each([
        [6, 16],
        [10, 50],
        [50, 1594],
        [100, 6536],
        [500, 167004],
        [1000, 668697],
        //[5000, 17733044]
    ])("given example with %i steps", (steps, expected) => {
        expect(numberOfPlotsReachableAfterSteps(exampleInput, steps)).toBe(expected);
    })
})