import { sumOfAllPartNumbers, sumOfAllGearRatios } from "./day_03"

test('number with no symbol returns zero', () => {
    expect(sumOfAllPartNumbers('.100.')).toBe(0);
})

test.each([
    '100*', '*100',
])('number horizontally adjacent to symbol returns number', (s) => {
    expect(sumOfAllPartNumbers(s)).toBe(100);
})

test.each([
    '100\n#..', '100\n..#', '..#\n100', '#..\n100'
])('number vertically adjacent to symbol returns number', (s) => {
    expect(sumOfAllPartNumbers(s)).toBe(100);
})

test.each([
    '100.\n...#', '.100\n#...', '#...\n.100', '...#\n100.'
])('number diagonally adjacent to symbol returns number', (s) => {
    expect(sumOfAllPartNumbers(s)).toBe(100);
})

test('first two lines of sample input', () => {
    expect(sumOfAllPartNumbers('467..114..\n...*......')).toBe(467);
})

test('full sample input', () => {
    let sampleInput = `467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`

    expect(sumOfAllPartNumbers(sampleInput)).toBe(4361);
})

// Part two

test.each([
    '2.2', '2.*.2', '100', '', '2*', '2*3\n.1.', '111\n1*1\n111'
])('test no gears', (s) => {
    expect(sumOfAllGearRatios(s)).toBe(0)
})

test('test simple gear', () => {
    expect(sumOfAllGearRatios('2*2')).toBe(4);
})

test('test single gear', () => {
    let sampleInput = `467..114..
    ...*......
    ..35..633.`

    expect(sumOfAllGearRatios(sampleInput)).toBe(16345);
})

test('test full gear example', () => {
    let sampleInput = `467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`

    expect(sumOfAllGearRatios(sampleInput)).toBe(467835);
})