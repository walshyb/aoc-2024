import { processInput } from "../common/utils";

function outOfBounds(num1: number, num2: number, grid: string[][]): boolean {
  return num1 < 0 || num2 < 0 || num1 >= grid.length || num2 >= grid[0].length;
}

function printGrid(grid: string[][]) {
  grid.forEach((line) => {
    console.log(line.toString().replace(/,/g, ""));
  });
  console.log("=====================");
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

  const pathing = {
    "^": "|",
    ">": "-",
    V: "|",
    "<": "-",
  };

  await processInput(`${__dirname}/input.txt`, processLine);

  grid[startingPosition[0]][startingPosition[1]] = "S";
  const nodes: number[][] = [startingPosition];
  let distinctPositions = 0;
  const seen: Set<string> = new Set();
  const seenDirectional: Set<string> = new Set();
  const potentialObstacles: Set<string> = new Set();

  while (nodes.length) {
    const [row, col] = nodes.pop();
    const seenIndex = `${row},${col}`;
    const seenDirectionIndex = seenIndex + direction;

    // If we've been here and the direction is different, change current grid symbol to +
    if (seen.has(seenIndex) && grid[row][col] !== "S") {
      if (grid[row][col] == "-" && (direction == "^" || direction == "V"))
        grid[row][col] = "+";

      if (grid[row][col] == "|" && (direction == "<" || direction == ">"))
        grid[row][col] = "+";
    }

    // If haven't been seen, add to index
    if (!seen.has(seenIndex)) {
      distinctPositions++;
      seen.add(seenIndex);
      seenDirectional.add(seenDirectionIndex);

      // Update grid symbol
      if (grid[row][col] !== "S") grid[row][col] = pathing[direction];
    }

    let nextRow = row + directions[direction][0];
    let nextCol = col + directions[direction][1];

    // End if going out of bounds
    if (outOfBounds(nextRow, nextCol, grid)) {
      potentialObstacles.add(seenIndex);
      grid[row][col] = "O";
      printGrid(grid);
      continue;
    }

    // If we're at a crossroads or the start
    // Look right to see if we've been there before
    if (grid[row][col] == "+" || grid[row][col] == "S") {
      const rightDirection: number[] = directions[rotations[direction]];
      const rightPosition: string = `${row + rightDirection[0]},${col + rightDirection[1]}`;

      // If the spot immediately to the right of current is already seen
      if (seenDirectional.has(rightPosition + rotations[direction])) {
        // Add a blocker in front of where we're going
        potentialObstacles.add(`${nextRow},${nextCol}`);
        const temp: string = grid[nextRow][nextCol];
        grid[nextRow][nextCol] = "O";
        printGrid(grid);
        grid[nextRow][nextCol] = temp;
      }
    }

    if (grid[nextRow][nextCol] == "#") {
      if (grid[row][col] !== "S") {
        grid[row][col] = "+";
      }
      // Rotate position
      direction = rotations[direction];

      // Recalculate next position based on new direction
      nextRow = row + directions[direction][0];
      nextCol = col + directions[direction][1];
    }

    nodes.push([nextRow, nextCol]);
  }

  console.log("Part 1", distinctPositions);
  console.log("Part 2", potentialObstacles.size);
}

part1();
