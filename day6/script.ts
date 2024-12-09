import { processInput } from "../common/utils";

function outOfBounds(num1: number, num2: number, grid: string[][]): boolean {
  return num1 < 0 || num2 < 0 || num1 >= grid.length || num2 >= grid[0].length;
}

async function part1(): Promise<void> {
  const grid: string[][] = [];
  let direction: string = "";
  let startingPosition: number[] = [];

  function processLine(line: string): void {
    const guardPosition = line.search(/[<,>,^,V]/);

    if (guardPosition > -1) {
      startingPosition = [grid.length, guardPosition];
      direction = line[guardPosition];
    }

    grid.push(line.split(""));
  }

  const directions = {
    "^": [-1, 0],
    ">": [0, 1],
    V: [1, 0],
    "<": [0, -1],
  };

  const rotations = {
    "^": ">",
    ">": "V",
    V: "<",
    "<": "^",
  };

  await processInput(`${__dirname}/input.txt`, processLine);

  const nodes: number[][] = [startingPosition];
  let distinctPositions = 0;
  const seen: Set<string> = new Set();

  while (nodes.length) {
    const [row, col] = nodes.pop();
    const seenIndex = `${row},${col}`;

    if (!seen.has(seenIndex)) {
      distinctPositions++;
      seen.add(seenIndex);
    }

    let nextRow = row + directions[direction][0];
    let nextCol = col + directions[direction][1];

    if (outOfBounds(nextRow, nextCol, grid)) {
      // or break?
      continue;
    }

    if (grid[nextRow][nextCol] == "#") {
      // Rotate position
      direction = rotations[direction];

      // Recalculate next position based on new direction
      nextRow = row + directions[direction][0];
      nextCol = col + directions[direction][1];
    }

    nodes.push([nextRow, nextCol]);
  }

  console.log("Part 1", distinctPositions);
}

part1();
