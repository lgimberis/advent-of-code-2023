interface Part {
  x?: number;
  m?: number;
  a?: number;
  s?: number;
}

interface Rule {
  attributeTarget?: string;
  targetValue?: number;
  destination: string;
  greaterThan?: boolean; // When there is a target, we can only accept greater or less than
}

interface Workflow {
  name: string;
  rules: Rule[];
}

// Important detail: not recursive. Entering another workflow is guaranteed to return A or R
export function interpretPart(partString: string): Part {
  let part = {};
  let matches = partString.matchAll(/(\w)=(\d+)/g);
  if (!matches) {
    console.error("Failed to match partString ", partString);
    return part;
  }

  for (let match of matches) {
    if (match.length < 3) continue;
    part[match[1]] = parseInt(match[2]);
  }
  return part;
}

export function interpretWorkflow(workflowString: string): Workflow {
  let ruleStartIndex = workflowString.indexOf("{");
  let name = workflowString.slice(0, ruleStartIndex).trim();
  let ruleStrings = workflowString.slice(ruleStartIndex + 1, workflowString.length - 1).split(",");
  let rules: Rule[] = [];
  for (let ruleString of ruleStrings) {
    let conditionalMatch = ruleString.match(/^(\w)(<|>)(\d+):(\w+)$/);
    if (conditionalMatch) {
      if (conditionalMatch.length < 5) console.error("Failed to match rule as expected");
      let attributeTarget = conditionalMatch[1];
      let destination = conditionalMatch[4];
      let targetValue = parseInt(conditionalMatch[3]);
      let greaterThan = conditionalMatch[2] == ">";
      rules.push( { attributeTarget, destination, targetValue, greaterThan } )
    } else {
      // Unconditional redirect
      if (rules.length != ruleStrings.length - 1) console.error("Early unconditional redirect for ", workflowString)
      rules.push( { destination: ruleString });
      break; // any further rules are never executed
    }
  }
  return { name, rules };
}

export function executeWorkflow(workflow: Workflow, part: Part): string {
  for (let rule of workflow.rules) {
    if (rule.attributeTarget == undefined || 
      (part[rule.attributeTarget] != undefined && (rule.greaterThan ? part[rule.attributeTarget] > rule.targetValue : part[rule.attributeTarget] < rule.targetValue))) {
      // Unconditional
      return rule.destination;
    }
  }
  return "";
}

export function sumOfAcceptedParts(data: string) {
  // Separate workflows and parts
  let lines = data.split("\n").map(line => line.trim());
  let newlineIndex = lines.indexOf("");

  let workflowArray = lines.slice(0, newlineIndex).filter(line => line).map(line => interpretWorkflow(line));
  let workflows: {[name: string]: Workflow} = {};
  for (let workflow of workflowArray) {
    workflows[workflow.name] = workflow;
  }
  let parts = lines.slice(newlineIndex+1).filter(line => line).map(line => interpretPart(line));

  let sum = 0;
  function partValue (part: Part): number {
    let partSum = 0;
    if (part.a) partSum += part.a;
    if (part.m) partSum += part.m;
    if (part.s) partSum += part.s;
    if (part.x) partSum += part.x;
    return partSum;
  }

  for (let part of parts) {
    //console.debug(`\nProcessing part ${Object.entries(part)}`)
    let workflow = "in";
    while (workflow != "R" && workflow != "A") {
      //console.debug(`Executing workflow ${workflow}: ${lines[workflowArray.indexOf(workflows[workflow])]}`);
      if (!workflows.hasOwnProperty(workflow)) console.error(`Workflows does not have workflow ${workflow}`)
      workflow = executeWorkflow(workflows[workflow], part);
    }
    if (workflow == 'A') {
      //console.debug(`Part ${Object.entries(part)} of value ${partValue(part)} is accepted: new sum ${sum + partValue(part)}`);
      sum += partValue(part);
    }
  }
  return sum;
}

// Part 2
interface Range {
  min: number;
  max: number;
}
interface PartRange {
  x: Range;
  m: Range;
  a: Range;
  s: Range;
}

function passCombinationsThroughWorkflow(rules: Rule[], partRange: PartRange): { destination: string, range: PartRange}[] {
  let processedCombinations: { destination: string, range: PartRange}[] = [];
  for (let rule of rules) {
    if (rule.attributeTarget == undefined) {
      processedCombinations.push({destination: rule.destination, range: partRange});
    } else {
      let newRange = {x: {...partRange.x}, m: {...partRange.m}, a: {...partRange.a}, s: {...partRange.s} };
      let key = rule.greaterThan ? "min" : "max";
      newRange[rule.attributeTarget][key] = rule.targetValue + (rule.greaterThan ? 1 : -1);
      processedCombinations.push({destination: rule.destination, range: newRange});
      let oppositeKey = rule.greaterThan ? "max" : "min";
      partRange[rule.attributeTarget][oppositeKey] = rule.targetValue;
    }
  }
  return processedCombinations;
}

export function totalCombinations(data: string): number {
  // Extract workflows only
  let lines = data.split("\n").map(line => line.trim());
  let newlineIndex = lines.indexOf("");

  if (newlineIndex != -1) lines = lines.slice(0, newlineIndex);
  let workflowArray = lines.filter(line => line).map(line => interpretWorkflow(line));
  let workflows: {[name: string]: Workflow} = {};
  for (let workflow of workflowArray) {
    workflows[workflow.name] = workflow;
  }

  let combinations = 0;
  let partRange = {
    x: { min: 1, max: 4000 },
    m: { min: 1, max: 4000 },
    a: { min: 1, max: 4000 },
    s: { min: 1, max: 4000 },
  }
  let pendingRanges: {destination: string, range: PartRange}[] = [{ destination: "in", range: partRange }];

  function isRangeValid(range: PartRange) {
    return range.x.max >= range.x.min && range.m.max >= range.m.min && range.a.max >= range.a.min && range.s.max >= range.s.min;
  }
  while (pendingRanges.length > 0) {
    let {destination, range} = pendingRanges.pop();
    if (!isRangeValid(range)) continue;
    if (destination == "R") continue;
    if (destination == "A") {
      let thisRangeCombinations = 1;
      thisRangeCombinations *= (range.x.max - range.x.min + 1) * (range.m.max - range.m.min + 1) * (range.a.max - range.a.min + 1) * (range.s.max - range.s.min + 1);
      combinations += thisRangeCombinations;
      continue;
    }
    if (!workflows.hasOwnProperty(destination)) console.error(`Workflows does not have workflow ${destination}`);
    let newRanges = passCombinationsThroughWorkflow(workflows[destination].rules, range);
    pendingRanges = pendingRanges.concat(newRanges);
  }
  return combinations;
}

function main(data: string) {
  //console.log(sumOfAcceptedParts(data)); // p1
  console.log(totalCombinations(data)); // p2
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_19_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
