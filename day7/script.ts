import { processInput } from "../common/utils";

class Node {
  total: number;
  index: number;

  constructor({ total, index }) {
    this.index = index;
    this.total = total;
  }
}

async function part1(): Promise<void> {
  const equations: number[][] = [];
  function processLine(line: string): void {
    const [target, nums] = line.split(": ");

    const numArr: number[] = nums.split(" ").map((n: string) => parseInt(n));
    equations.push([parseInt(target), ...numArr]);
  }

  await processInput(`${__dirname}/input.txt`, processLine);

  let result = 0;

  equations.forEach((equation: number[]) => {
    const target = equation[0];
    const nums: number[] = equation.slice(1);

    let tree: Node = new Node({
      total: nums[0],
      index: 0,
    });

    const nodesToSee: Node[] = [tree];

    while (nodesToSee.length) {
      const current: Node = nodesToSee.pop();
      const { index, total } = current;

      if (total == target && index == nums.length - 1) {
        result += target;
        return;
      }

      const nextIndex = index + 1;
      const nextNumber = nums[nextIndex];

      const left = new Node({
        index: nextIndex,
        total: total + nextNumber,
      });

      const right = new Node({
        index: nextIndex,
        total: total * nextNumber,
      });

      const mid = new Node({
        index: nextIndex,
        total: parseInt("" + total + nextNumber),
      });

      if (index < nums.length) {
        nodesToSee.push(left);
        nodesToSee.push(right);
        nodesToSee.push(mid);
      }
    }
  });

  console.log("Part 1", result);
}

part1();
