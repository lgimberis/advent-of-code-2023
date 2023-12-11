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

function oppositeDirection(d: Direction): Direction {
  return (d + 2) % 4;
}

class TileTypeClass {
  connections: Direction[]
  constructor(connections: Direction[]) { this.connections = connections; }
}

const TileTypeDirections: {[key: string]: Direction[]} = {
  [TileType.GROUND]: [],
  [TileType.ANIMAL]: [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST],
  [TileType.VERTICAL]: [Direction.NORTH, Direction.SOUTH],
  [TileType.HORIZONTAL]: [Direction.EAST, Direction.WEST],
  [TileType.NORTHEAST]: [Direction.NORTH, Direction.EAST],
  [TileType.SOUTHEAST]: [Direction.EAST, Direction.SOUTH],
  [TileType.SOUTHWEST]: [Direction.SOUTH, Direction.WEST],
  [TileType.NORTHWEST]: [Direction.WEST, Direction.NORTH],
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

function interpretInput(input: string): {tiles: TileType[], mapWidth: number, mapHeight: number} {
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
  let mapHeight = Math.floor(tiles.length / mapWidth);
  return {tiles, mapWidth, mapHeight};
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

function findConnectedAdjacentTiles(tiles: TileType[], index: number, mapWidth: number, mapHeight: number): {index: number, direction: Direction}[] {
  // Returns an array of indices of tiles connected to the tile at index

  let adjacentTiles = findAdjacentTileIndices(index, mapWidth, mapHeight);
  let connectedTiles: {index: number, direction: Direction}[] = [];

  for (let direction of TileTypeDirections[tiles[index]]) {
    if (adjacentTiles.hasOwnProperty(direction) && 
    TileTypeDirections[tiles[adjacentTiles[direction]]].includes(oppositeDirection(direction))) {
      connectedTiles.push({index: adjacentTiles[direction], direction});
    }
  }
  return connectedTiles;
}

export function stepsToReachFurthestPipeInLoop(input: string): number {
  let {tiles, mapWidth, mapHeight} = interpretInput(input);

  // find the "animal" tile
  let animalTile = tiles.indexOf(TileType.ANIMAL);

  // find adjacent tiles of the animal tile
  let animalAdjacentTiles = findConnectedAdjacentTiles(tiles, animalTile, mapWidth, mapHeight);

  for (let possibleLoopStartTile of animalAdjacentTiles) {
    let previousTile = animalTile;
    let currentTile = possibleLoopStartTile;
    let startIndex = 0;

    let connectedTiles: {index: number, direction: Direction}[]
    while((connectedTiles = findConnectedAdjacentTiles(tiles, currentTile.index, mapWidth, mapHeight)).length > 1) {
      connectedTiles = connectedTiles.filter(t => t.index != previousTile);
      if (connectedTiles.length > 1) {
        console.error("Somehow a tile has more than one non-previous connected tiles!", connectedTiles, currentTile);
      }
      
      if (connectedTiles[0].index == animalTile) {
        return Math.floor((startIndex + 2) / 2);
      }
      startIndex += 1;
      previousTile = currentTile.index; 
      currentTile = connectedTiles[0];
    }
  }

  return -1; // Couldn't find a loop
}

export function tilesEnclosedBy(input: string): number {
  let {tiles, mapWidth, mapHeight} = interpretInput(input);

  // find the "animal" tile
  let animalTile = tiles.indexOf(TileType.ANIMAL);

  let isPartOfLoop: boolean[] = Array(mapWidth * mapHeight).fill(false);
  isPartOfLoop[animalTile] = true;

  // find adjacent tiles of the animal tile
  let animalAdjacentTiles = findConnectedAdjacentTiles(tiles, animalTile, mapWidth, mapHeight);
  let loopTiles: {index: number, direction: Direction}[] = [];

  for (let possibleLoopStartTile of animalAdjacentTiles) {
    let previousTile = animalTile;
    let currentTile = possibleLoopStartTile;

    isPartOfLoop.fill(false); // Reset loop array
    isPartOfLoop[animalTile] = true;
    loopTiles = [currentTile]

    let connectedTiles: {index: number, direction: Direction}[];
    while((connectedTiles = findConnectedAdjacentTiles(tiles, currentTile.index, mapWidth, mapHeight)).length > 1) {
      connectedTiles = connectedTiles.filter(t => t.index != previousTile);
      if (connectedTiles.length > 1) {
        console.error("Somehow a tile has more than one non-previous connected tiles!", connectedTiles, currentTile);
      }
      
      loopTiles.push(connectedTiles[0])
      isPartOfLoop[currentTile.index] = true;
      if (connectedTiles[0].index == animalTile) {
        break;
      }
      previousTile = currentTile.index; 
      currentTile = connectedTiles[0];
    }
  }

  // Replace the 'Animal' tile with the actual pipe connection
  let animalTileNewType = [loopTiles[0].direction, oppositeDirection(loopTiles[loopTiles.length - 1].direction)];
  for (let [k, v] of Object.entries(TileTypeDirections)) {
    if (v.every(d => animalTileNewType.includes(d)) && animalTileNewType.every(d => v.includes(d))) {
      tiles[animalTile] = parseInt(k);
    }
  }

  // Having filled isPartOfLoop, iterate over it horizontally to find enclosed tiles
  // TODO vertically?
  let enclosedTiles = 0;

  
  for (let row = 0; row < mapHeight; row++) {
    let isEnclosing = false;
    let partialDirection: Direction | null = null;
    for (let column = 0; column < mapWidth; column++) {
      let tileIndex = row * mapWidth + column;

      if (isPartOfLoop[tileIndex]) {
        let northOrSouth = TileTypeDirections[tiles[tileIndex]].filter(d => d == Direction.NORTH || d == Direction.SOUTH);
        if (tiles[tileIndex] == TileType.VERTICAL) {
          isEnclosing = !isEnclosing;
        }
        else if (partialDirection != null && (TileTypeDirections[tiles[tileIndex]].includes(partialDirection))) {
          partialDirection = null;
        }
        else if (partialDirection != null && (TileTypeDirections[tiles[tileIndex]].includes(oppositeDirection(partialDirection)))) {
          partialDirection = null;
          isEnclosing = !isEnclosing;
        }
        else {
          if (northOrSouth.length == 1) {
            partialDirection = northOrSouth[0];
          }
        }
      } else {
        if (isEnclosing) {
          enclosedTiles++;
        }
      }

    }
  }
  return enclosedTiles;
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
