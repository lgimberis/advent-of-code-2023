
interface ValueRange {
    start: number;
    end: number;
    offset: number;
}

export function createMap(mapDefinition: number[]): (v: ValueRange) => Generator<ValueRange, any, unknown> {
    // Returns a generator which will map a single argument value according to given definition

    if (mapDefinition.length % 3 !== 0) {
        console.error("mapDefinition of length %d should be multiple of 3", mapDefinition.length)
    }

    let map: {start: number, end: number, offset: number}[] = [];
    for (let i = 0; i < mapDefinition.length; i += 3) {
        let start = mapDefinition[i + 1];
        let end = mapDefinition[i + 1] + mapDefinition[i + 2] - 1;
        let offset = mapDefinition[i] - start;

        map.push({start, end, offset});
    }

    map.sort((a, b) => a.start - b.start);

    let contiguousMap: ValueRange[] = [{start: Math.min(0, map[0].start - 1), end: map[0].start - 1, offset: 0}]
    for (let i = 0; i < map.length; i++) {
        contiguousMap.push({start: map[i].start, end: map[i].end, offset: map[i].offset});
        if (i < map.length - 1) {
            if (map[i+1].start > map[i].end + 1) {
                contiguousMap.push({start: map[i].end + 1, end: map[i+1].start - 1, offset: 0});
            }
        }
    }
    contiguousMap.push({start: map[map.length - 1].end + 1, end: Number.MAX_SAFE_INTEGER, offset: 0})

    return function* (v: ValueRange): Generator<any, any, ValueRange>{
        for (let {start, end, offset} of contiguousMap) {
            if (v.start + v.offset <= end && v.end + v.offset >= start) {
                yield { 
                    start: Math.max(start - v.offset, v.start),
                    end: Math.min(v.end, end - v.offset), 
                    offset: v.offset + offset
                };
            }
        }
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

function consumeMapper(seed: {label: string, range: ValueRange}, mappers: MapperChain): number | null {
    // Given initial data, exhaust all mappers to return all discoverable data

    if (mappers.hasOwnProperty(seed.label)) {
        let gen: Generator<ValueRange, any, unknown> = mappers[seed.label].map(seed.range);
        let next: IteratorResult<any, any>;
        let lowestLocation: number | null = null;
        while ((next = gen.next()) && next.value) {
            let minimumLocationOfRange = consumeMapper({label: mappers[seed.label].destination, range: next.value}, mappers);
            if (minimumLocationOfRange && (lowestLocation === null || minimumLocationOfRange! < lowestLocation!)) {
                lowestLocation = minimumLocationOfRange;
            }
        }
        return lowestLocation;
    } else {
        return seed.range.start + seed.range.offset;
    }
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
        let seedRange = { start: seeds[i], end: seeds[i] + seeds[i + 1] - 1, offset: 0};
        let thisRangeLowestLocation = consumeMapper({label: 'seed', range: seedRange}, mappers);
        if (thisRangeLowestLocation && (lowestLocation === null || lowestLocation > thisRangeLowestLocation)) {
            lowestLocation = thisRangeLowestLocation;
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