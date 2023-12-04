import { sumPossibleGameIds, sumPowersOfMinimumSetsOfCubes } from "./day_02";

let gameSetup = { red: 12, green: 13, blue: 14 }

test('test a possible game', () => {
    let gameOutcomes = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
    expect(sumPossibleGameIds(gameOutcomes, gameSetup)).toBe(1);
})

test('test an impossible game', () => {
    let gameOutcomes = 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red';
    expect(sumPossibleGameIds(gameOutcomes, gameSetup)).toBe(0);
})

test('test a possible and impossible game', () => {
    let gameOutcomes = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red`
    
    expect(sumPossibleGameIds(gameOutcomes, gameSetup)).toBe(1);
})

test('test given data', () => {
    let gameOutcomes = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

    expect(sumPossibleGameIds(gameOutcomes, gameSetup)).toBe(8);
})

test('test first game returns correct power', () => {
    let gameOutcomes = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
    expect(sumPowersOfMinimumSetsOfCubes(gameOutcomes)).toBe(48);
})

test('test given data for sum of powers', () => {
    let gameOutcomes = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

    expect(sumPowersOfMinimumSetsOfCubes(gameOutcomes)).toBe(2286);
})