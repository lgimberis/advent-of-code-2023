import { parseString } from "./day_01_a";

test('numbers at both ends of string', () => {
    expect(parseString('1abc2')).toBe(12);
})

test('numbers within a string', () => {
    expect(parseString('pqr3stu8vwx')).toBe(38);
})

test('multiline input', () => {
    let inputString = `1abc2
    pqr3stu8vwx`;
    expect(parseString(inputString)).toBe(50);
})

test('single number in a string', () => {
    expect(parseString('treb7uchet')).toBe(77);
})

test('full given sample input', () => {
    let inputString = `1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet`;
    expect(parseString(inputString)).toBe(142);
})
