import { leastHeatLoss } from "./day_17";

test.each([
    ["11", 2],
    ["141\n111", 4],
    ["111\n141", 4],
    [`
    0000
    4404
    4404
    4004
    4040
    4000
    `, 0]
])("simple tests %s -> %d", (input, expected) => {
    expect(leastHeatLoss(input)).toBe(expected);
});

let sampleInput = `2413432311323
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