enum TileType {
  GROUND,
  ANIMAL,
  VERTICAL,
  HORIZONTAL,
  NORTHEAST,
  SOUTHEAST,
  SOUTHWEST,
  NORTHWEST
}

enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST
}

class TileTypeClass {
  connections: Direction[]
  constructor(connections: Direction[]) { this.connections = connections; }
}

const TileTypeCo: {[key: string]: TileTypeClass} = {
  [TileType.GROUND]: new TileTypeClass([]),
  [TileType.ANIMAL]: new TileTypeClass([Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST]),
  [TileType.VERTICAL]: new TileTypeClass([Direction.NORTH, Direction.SOUTH]),
  [TileType.HORIZONTAL]: new TileTypeClass([Direction.EAST, Direction.WEST]),
  [TileType.NORTHEAST]: new TileTypeClass([Direction.NORTH, Direction.EAST]),
  [TileType.SOUTHEAST]: new TileTypeClass([Direction.EAST, Direction.SOUTH]),
  [TileType.SOUTHWEST]: new TileTypeClass([Direction.SOUTH, Direction.WEST]),
  [TileType.NORTHWEST]: new TileTypeClass([Direction.WEST, Direction.NORTH]),
}
function mapInputCharacterToTileType(input: string) {

  switch (input) {
    case '.':
      return TileType.GROUND;
    case 'S':
      return TileType.ANIMAL;
    case '|':
      return TileType.VERTICAL;
    case '-':
      return TileType.HORIZONTAL;
    case 'L':
      return TileType.NORTHEAST;
    case 'F':
      return TileType.SOUTHEAST;
    case '7':
      return TileType.SOUTHWEST;
    case 'J': 
      return TileType.NORTHWEST;
    default:
      console.error("Did not recognise tile type %s, using ground", input);
      return TileType.GROUND;
  }
}

function interpretInput(input: string): {tiles: TileType[], mapWidth: number} {
  let lines = input.split("\n");
  let tiles: TileType[] = []
  let mapWidth = -1;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (mapWidth == -1) {
      mapWidth = line.length;
    } else {
      if (mapWidth != line.length) console.error("Inconsistent map widths between lines");
    }
    
    for (let s of line) {
      tiles.push(mapInputCharacterToTileType(s));
    }
  }
  return {tiles, mapWidth};
}

function findAdjacentTileIndices(index: number, mapWidth: number, mapHeight: number): {[key: number]: number} {
  // Returns a list of indices which are "adjacent" to the tile at given index

  let x = index % mapWidth;
  let y = Math.floor(index / mapWidth);

  let adjacentTiles: {[key: number]: number} = {};
  if (x > 0) adjacentTiles[Direction.WEST] = index - 1;
  if (x < mapWidth - 1) adjacentTiles[Direction.EAST] = index + 1;
  if (y > 0) adjacentTiles[Direction.NORTH] = index - mapWidth;
  if (y < mapHeight - 1) adjacentTiles[Direction.SOUTH] = index + mapWidth;

  return adjacentTiles;
}

function findConnectedAdjacentTiles(tiles: TileType[], index: number, mapWidth: number, mapHeight: number): number[] {
  // Returns an array of indices of tiles connected to the tile at index

  let adjacentTiles = findAdjacentTileIndices(index, mapWidth, mapHeight);
  let connectedTiles: number[] = [];

  const directionValidTileTypes: {[direction: number]: TileType[]} = {
    [Direction.NORTH]: [TileType.ANIMAL, TileType.VERTICAL, TileType.SOUTHEAST, TileType.SOUTHWEST],
    [Direction.EAST]: [TileType.ANIMAL, TileType.HORIZONTAL, TileType.NORTHWEST, TileType.SOUTHWEST],
    [Direction.SOUTH]: [TileType.ANIMAL, TileType.VERTICAL, TileType.NORTHEAST, TileType.NORTHWEST],
    [Direction.WEST]: [TileType.ANIMAL, TileType.HORIZONTAL, TileType.NORTHEAST, TileType.SOUTHEAST]
  };
  for (let direction of TileTypeCo[tiles[index]].connections) {
    if (adjacentTiles.hasOwnProperty(direction)) {
      if (directionValidTileTypes[direction].includes(tiles[adjacentTiles[direction]])) {
        connectedTiles.push(adjacentTiles[direction]);
      }
    }
  }
  return connectedTiles;

}

export function stepsToReachFurthestPipeInLoop(input: string): number {
  let {tiles, mapWidth} = interpretInput(input);

  let mapHeight = Math.floor(tiles.length / mapWidth);

  // find the "animal" tile
  let animalTile = tiles.indexOf(TileType.ANIMAL);

  // find adjacent tiles of the animal tile
  let animalAdjacentTiles = findConnectedAdjacentTiles(tiles, animalTile, mapWidth, mapHeight);

  for (let possibleLoopStartTile of animalAdjacentTiles) {
    let previousTile = animalTile;
    let currentTile = possibleLoopStartTile;
    let startIndex = 0;

    let connectedTiles: number[]
    while((connectedTiles = findConnectedAdjacentTiles(tiles, currentTile, mapWidth, mapHeight)).length > 1) {
      connectedTiles = connectedTiles.filter(t => t != previousTile);
      if (connectedTiles.length > 1) {
        console.error("Somehow a tile has more than one non-previous connected tiles!", connectedTiles, currentTile);
      }
      
      if (connectedTiles[0] == animalTile) {
        return Math.floor((startIndex + 2) / 2);
      }
      startIndex += 1;
      previousTile = currentTile; 
      currentTile = connectedTiles[0];
    }
  }

  return -1; // Couldn't find a loop
}

export function tilesEnclosedBy(input: string): number {
  return 0;
}

function main(data: string) {
  console.log(tilesEnclosedBy(data));
}

if (require.main === module) {
  const fs = require("node:fs");

  fs.readFile("./day_10_data.txt", "utf8", (err, data) => {
      if (err) {
          console.log(err);
          return;
      }
      main(data);
  });
}
