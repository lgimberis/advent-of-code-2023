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

export function getStepsForGhosts(input: string, startRe: RegExp, endRe: RegExp): number {
  return 0;
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
