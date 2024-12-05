import { processInput } from "../common/utils";

async function part1(): Promise<void> {
  let safe = 0;

  function processLine(line: string): void {
    const nums: string[] = line.split(" ");
    const first: number = parseInt(nums[0]);
    let previous: number = parseInt(nums[1]);
    const increasing: boolean = first < previous;

    if (first == previous) return;
    if (Math.abs(first - previous) > 3) return;

    for (let i = 2; i < nums.length; i++) {
      const current = parseInt(nums[i]);

      if (Math.abs(current - previous) > 3) return;

      if (
        (increasing && current < previous) ||
        (!increasing && current > previous)
      )
        return;

      if (current == previous) return;

      previous = current;
    }

    //console.log("safe", line);
    safe += 1;
  }
  // Read input
  await processInput(`${__dirname}/input.txt`, processLine);

  console.log(`Part 1: ${safe}`);
}

part1();