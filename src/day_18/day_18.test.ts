import { digTrench, excavateInterior, volumeOfLagoon } from "./day_18";

let exampleInput = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;

let dugTrench = `#######
#.....#
###...#
..#...#
..#...#
###.###
#...#..
##..###
.#....#
.######`;

let excavatedInterior = `#######
#######
#######
..#####
..#####
#######
#####..
#######
.######
.######`;

let trickyTrenchToExcavate = `######
#...##
##..#.
.##.#.
..###.`

let trickyExcavatedTrench = `######
######
#####.
.####.
..###.`

describe('part 1 tests', () => {
    test('dig trench correctly', () => {
        expect(digTrench(exampleInput)).toStrictEqual(dugTrench);
    });

    test.each([
        [trickyTrenchToExcavate, trickyExcavatedTrench]
    ])('excavate trench mini tests', (input, expected) => {
        expect(excavateInterior(input)).toStrictEqual(expected);
    });

    test('excavate trench correctly', () => {
        expect(excavateInterior(dugTrench)).toStrictEqual(excavatedInterior);
    })

    test.each([
        [dugTrench, 38],
        [excavatedInterior, 62]
    ])('correctly count excavated space', (input, expected) => {
        expect(volumeOfLagoon(input)).toBe(expected);
    })
});