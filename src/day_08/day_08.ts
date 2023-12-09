interface Node {
  L: string;
  R: string;
}

function interpretInput(input: string): {
  instructions: string;
  nodes: { [key: string]: Node };
} {
  let lines = input.split("\n");
  if (lines.length < 3) throw Error();

  let instructions = lines[0];

  let nodes: { [key: string]: Node } = {};
  for (let i = 0; i < lines.length; i++) {
    let match = lines[i].match(/(\w+) = \((\w+), (\w+)\)/);
    if (!match || match.length < 4) continue;

    let key = match[1];
    let node = { L: match[2], R: match[3] };
    nodes[key] = node;
  }

  return { instructions, nodes };
}

export function getStepsToReach(input: string, destination: string): number {
  let { instructions, nodes } = interpretInput(input);
  
  let currentNode = 'AAA';
  let stepsTaken = 0;
  while (currentNode !== destination) {
    currentNode = nodes[currentNode][instructions[stepsTaken % instructions.length]];
    stepsTaken++;
  }
  return stepsTaken;
}

function gcd(a: number, b: number) {
  if (a == b || b == 0) return a;
  if (a > b) return gcd(b, a % b);
  if (a == 0) return b;
  return gcd(a, b % a);
}

function lcm(a: number, b: number) {
  return a * (b / gcd(a, b));
}

export function getStepsForGhosts(input: string, startRe: RegExp, endRe: RegExp): number {
  let { instructions, nodes } = interpretInput(input);
  
  // NB this code works for the input data given in this specific case
  // It happens that the offset until we reach the start of our "loop", is cancelled by the nodes after /Z$/,
  // such that if /Z$/ is at index N then it will also be at 2N, 3N, ... given random data we would expect Z at N + a, 2N + a, ...
  let nodeCycles: {[key: string]: number} = {};  // Number of steps until nodes[key] reaches a node that matches `endRe`
  for (let node of Object.keys(nodes)) {
    if (node.match(startRe)) {
      nodeCycles[node] = -1;
      let stepsTaken = 0;
      let currentNode = node;
      while (stepsTaken == 0 || currentNode !== node || (stepsTaken % instructions.length) !== 0) {
        currentNode = nodes[currentNode][instructions[stepsTaken % instructions.length]];
        stepsTaken += 1;

        if (currentNode.match(endRe)) {
          nodeCycles[node] = stepsTaken;
          break;
        }
      }
    }
  }

  let stepsUntilStride = Object.values(nodeCycles).reduce((s, c) => lcm(s, c), 1);
  return stepsUntilStride
}

function main(data: string) {
  console.log(getStepsForGhosts(data, /A$/, /Z$/));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_08_data.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    main(data);
  });
}
