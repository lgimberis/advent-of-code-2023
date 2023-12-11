enum TileType {
  GROUND,
  ANIMAL, // The tile the animal is on (the 'animal' tile) has exactly 2 connections, but their directions are unknown
  VERTICAL,
  HORIZONTAL,
  NORTHEAST,
  SOUTHEAST,
  SOUTHWEST,
  NORTHWEST
}

enum Direction {
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3
}

function oppositeDirection(d: Direction): Direction {
  return (d + 2) % 4;
}

// Define the directions to which a tile of given type is/may be connected
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
  // Returns a list of indices which are "adjacent" to the tile at given index, accounting for being at the "edges"

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
    if (adjacentTiles.hasOwnProperty(direction)) {
      // If there is a tile in a direction to which the current tile is connected, it doesn't necessarily connect on this tile

      let adjacentTile = tiles[adjacentTiles[direction]];
      let isAdjacentTileConnected = TileTypeDirections[adjacentTile].includes(oppositeDirection(direction));
      if (isAdjacentTileConnected)
      {
        connectedTiles.push({index: adjacentTiles[direction], direction});
      }
    }
  }
  return connectedTiles;
}

function findLoopContainingAnimal(tiles: TileType[], mapWidth: number, mapHeight: number): {isPartOfLoop: boolean[], loopTiles: {index: number, direction: Direction}[]} {
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

  return {isPartOfLoop, loopTiles}
}

export function stepsToReachFurthestPipeInLoop(input: string): number {
  let {tiles, mapWidth, mapHeight} = interpretInput(input);

  let { isPartOfLoop, loopTiles } = findLoopContainingAnimal(tiles, mapWidth, mapHeight);

  return Math.floor(loopTiles.length / 2);
}

export function tilesEnclosedBy(input: string): number {
  let {tiles, mapWidth, mapHeight} = interpretInput(input);

  let { isPartOfLoop, loopTiles } = findLoopContainingAnimal(tiles, mapWidth, mapHeight);

  let animalTile = tiles.indexOf(TileType.ANIMAL);

  // Replace the 'Animal' tile with the actual pipe connection
  let animalTileNewType = [loopTiles[0].direction, oppositeDirection(loopTiles[loopTiles.length - 1].direction)];
  for (let [k, v] of Object.entries(TileTypeDirections)) {
    if (v.every(d => animalTileNewType.includes(d)) && animalTileNewType.every(d => v.includes(d))) {
      tiles[animalTile] = parseInt(k);
    }
  }

  // Having filled isPartOfLoop, iterate over it horizontally to find enclosed tiles
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
