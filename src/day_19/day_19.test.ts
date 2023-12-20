import { executeWorkflow, interpretWorkflow, interpretPart, sumOfAcceptedParts, totalCombinations } from "./day_19";

describe("part 1 tests", () => {
    test.each([
        ["{x=11}", "one"],
        ["{m=19}", "two"],
        ["{a=31}", "R"],
        ["{}", "A"]
    ]) ("expect part %s to be sent to %s", (part, expected) => {
        let workflow = "ex{x>10:one,m<20:two,a>30:R,A}";
        expect(executeWorkflow(interpretWorkflow(workflow), interpretPart(part))).toStrictEqual(expected);
    })

    let exampleInput = `px{a<2006:qkq,m>2090:A,rfg}
    pv{a>1716:R,A}
    lnx{m>1548:A,A}
    rfg{s<537:gd,x>2440:R,A}
    qs{s>3448:A,lnx}
    qkq{x<1416:A,crn}
    crn{x>2662:A,R}
    in{s<1351:px,qqz}
    qqz{s>2770:qs,m<1801:hdj,R}
    gd{a>3333:R,R}
    hdj{m>838:A,pv}
    
    {x=787,m=2655,a=1222,s=2876}
    {x=1679,m=44,a=2067,s=496}
    {x=2036,m=264,a=79,s=2244}
    {x=2461,m=1339,a=466,s=291}
    {x=2127,m=1623,a=2188,s=1013}
    `;

    test('sample test', () => {
        expect(sumOfAcceptedParts(exampleInput)).toBe(19114);
    })
});

describe("part 2 tests", () => {
    test.each([
        [`in{a<2001:A,R}`, 128000000000000 ],
        [`in{a<2001:one,R}\none{a<1001:A,m>2000:A,R}`, 96000000000000]
    ])("simple tests", (input, expected) => {
        expect(totalCombinations(input)).toBe(expected);
    })

    let sampleInput = `px{a<2006:qkq,m>2090:A,rfg}
    pv{a>1716:R,A}
    lnx{m>1548:A,A}
    rfg{s<537:gd,x>2440:R,A}
    qs{s>3448:A,lnx}
    qkq{x<1416:A,crn}
    crn{x>2662:A,R}
    in{s<1351:px,qqz}
    qqz{s>2770:qs,m<1801:hdj,R}
    gd{a>3333:R,R}
    hdj{m>838:A,pv}`

    test("sample test", () => {
        expect(totalCombinations(sampleInput)).toBe(167409079868000);
    })
})