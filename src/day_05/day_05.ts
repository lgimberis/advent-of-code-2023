
export function createMap(mapDefinition: number[]): (v: number) => number {
    // Returns a function which will map a single argument value according to given definition

    if (mapDefinition.length % 3 !== 0) {
        console.error("mapDefinition of length %d should be multiple of 3", mapDefinition.length)
    }

    return (v: number) => {
        for (let i = 0; i < mapDefinition.length; i += 3) {
            let start = mapDefinition[i + 1];
            let end = mapDefinition[i + 1] + mapDefinition[i + 2] - 1;
            let output = mapDefinition[i];

            if (v >= start && v <= end) {
                return output + (v - start);
            }
        }
        return v;
    }
}

export function interpretInput(input: string): {[key: string]: number[]} {
    // Interprets given input data as an object

    input = input.replace("\n", " ");
    let categoryRe = /([\D]+):\s?([\s\d]+)/g;
    let matches = input.matchAll(categoryRe);
    let processedInput = {}
    for (let match of matches) {
        if (match.length < 3) {
            continue;
        }
        processedInput[match[1]] = match[2].split(/\D/).filter(s => s).map(s => parseInt(s));
    }
    return processedInput;
}

interface ValueMapper {
    destination: string;
    map: Function;
}

interface MapperChain {[key: string]: ValueMapper}

function consumeMapper(seed: {label: string, value: number}, mappers: MapperChain) {
    // Given initial data, exhaust all mappers to return all discoverable data

    let finalOutput = {}
    finalOutput[seed.label] = seed.value;

    let currentLabel = seed.label;
    while (mappers.hasOwnProperty(currentLabel)) {
        // Set the value that the current label maps onto, and prepare the next label
        finalOutput[mappers[currentLabel].destination] = mappers[currentLabel].map(finalOutput[currentLabel]);
        currentLabel = mappers[currentLabel].destination
    }

    return finalOutput;
}

function getNextMapper(source: string, input: {[key: string]: number[]}): ValueMapper | null {
    // Find the mapper from `source` to another value, if one exists, and return it

    let re = new RegExp(`${source}-to-(\\w+) map`)
    let nextKey = Object.keys(input).find(s => s.match(re))
    if (!nextKey) return null;

    let match = nextKey.match(re);
    if (!match || match.length < 2) return null;

    return {
        destination: match[1],
        map: createMap(input[nextKey])
    }
}

function generateMappers(input: {[key: string]: number[]}): MapperChain {
    // Return an object defining all mappers

    let mappers: MapperChain = {}

    let currentMapper: ValueMapper | null = null;
    let currentSource = "seed";
    while ((currentMapper = getNextMapper(currentSource, input)) !== null) {
        mappers[currentSource] = currentMapper
        currentSource = currentMapper.destination
    }

    return mappers;
}

export function findLowestLocationNumber(input: string): number {
    // Returns the number of the lowest location

    let processedInput = interpretInput(input);
    let mappers = generateMappers(processedInput);

    let seeds = processedInput["seeds"];
    let lowestLocation: number | null = null
    for (let i = 0; i < seeds.length; i += 2) {
        console.debug("Checking from %d to %d", seeds[i], seeds[i + 1] + seeds[i])
        let timenow = Date.now()
        for (let seedValue = seeds[i]; seedValue < seeds[i] + seeds[i + 1]; seedValue++)
        {
            let timehere = Date.now();
            if (timehere - timenow > 10000) {
                timenow = timehere;
                console.debug("Done %d/%d seeds", seedValue - seeds[i], seeds[i+1])
            }
            let seed = consumeMapper({label: 'seed', value: seedValue}, mappers);
            if (seed.hasOwnProperty("location")) {
                if (lowestLocation === null || seed["location"] < lowestLocation) {
                    lowestLocation = seed["location"]
                }
            }
        }
    }

    return lowestLocation || 0;
}

if (require.main === module)
{
    const fs = require('node:fs')

    fs.readFile("./day_05_data.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(findLowestLocationNumber(data));
    });
}