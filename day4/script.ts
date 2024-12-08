import { processInput } from "../common/utils";

async function part1(): Promise<void> {
  const grid: string[][] = [];

  function processLine(line: string): void {
    grid.push(line.split(""));
  }

  await processInput(`${__dirname}/input.txt`, processLine);

  const nodes: Node[] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const node: Node = {
        val: grid[i][j],
        i: i,
        j: j,
        running: grid[i][j],
        direction: [0, 0],
      };
      nodes.push(node);
    }
  }

  function addNewNode(
    currentRow: number,
    currentCol: number,
    rowDirection: number,
    colDirection: number,
    running: string,
  ) {
    const nextRow = currentRow + rowDirection;
    const nextCol = currentCol + colDirection;
    if (
      nextRow >= grid.length ||
      nextRow < 0 ||
      nextCol >= grid[0].length ||
      nextCol < 0
    ) {
      return;
    }

    const nextChar: string = grid[nextRow][nextCol];

    if (!valid.has(running + nextChar)) {
      return;
    }

    nodes.push({
      val: nextChar,
      i: nextRow,
      j: nextCol,
      running: running + nextChar,
      direction: [rowDirection, colDirection],
    });
  }

  let xmasCount = 0;
  const seen: Set<string> = new Set();
  const valid: Set<string> = new Set(["X", "XM", "XMA", "XMAS"]);

  // dfs dfs dfs dfs!!
  while (nodes.length > 0) {
    // @ts-ignore
    const current: Node = nodes.pop();
    const currentRow: number = current.i;
    const currentCol: number = current.j;
    const running: string = current.running;
    const direction = current.direction;
    const seenIndex = `${currentRow},${currentCol},${direction.toString()}`;

    if (seen.has(seenIndex)) {
      continue;
    }

    seen.add(seenIndex);

    if (running.length >= 4) {
      if (current.running === "XMAS") {
        xmasCount++;
      }
      continue;
    }

    if (!valid.has(running)) {
      seen.add(seenIndex);
      continue;
    }

    seen.add(seenIndex);

    if (!(direction[0] == 0 && direction[1] == 0)) {
      addNewNode(currentRow, currentCol, direction[0], direction[1], running);
      continue;
    }

    // Check surrounding neighbors
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i == 0 && j == 0) {
          continue;
        }
        addNewNode(currentRow, currentCol, i, j, running);
      }
    }
  }

  console.log(`Part 1: ${xmasCount}`);
}

type Node = {
  val: string | null;
  i: number;
  j: number;
  running: string;
  direction: number[];
};

part1();
