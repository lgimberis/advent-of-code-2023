import { leastHeatLoss } from "./day_17";

test.each([
    ["11", 1],
    ["141\n111", 3],
    ["111\n141", 3],
    [`
    1111
    4414
    4114
    4141
    4111
    `, 9]
])("simple tests %s -> %d", (input, expected) => {
    expect(leastHeatLoss(input)).toBe(expected);
});

test.each([
    ["11111\n12221", 6],
    [`
    11111
    12441
    13551
    13551
    11111
    `, 10], 
    [`
    2413432311323
    3215453535623
    3255245654254
    3446585845452
    4546657867536
    1438598798454
    4457876987766
    3637877979653
    `, 74],
    [`
    24134323113
    32154535356
    32552456542`, 43],
    [`
    241343231
    321545353
    325524565`, 37]
])("tests that account for the 3-tile rule", (input, expected) => {
    expect(leastHeatLoss(input)).toBe(expected);
})

let sampleInput = `
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

test("given example test", () => {
    expect(leastHeatLoss(sampleInput)).toBe(102);
})