import { processInput } from "../common/utils";

async function part1(): Promise<void> {
  // Map page numbers to pages that must come after it
  const ordering: Map<string, Set<string>> = new Map();
  const updates = [];

  function processLine(line: string): void {
    if (line.includes("|")) {
      const nums: string[] = line.split("|");

      if (ordering.has(nums[0])) {
        const pageBefore: Set<string> = ordering.get(nums[0]);
        pageBefore.add(nums[1]);

        ordering.set(nums[0], pageBefore);
        return;
      }

      ordering.set(nums[0], new Set([nums[1]]));
    }

    if (line.includes(",")) {
      const nums: string[] = line.split(",");
      updates.push(nums);
    }
  }

  await processInput(`${__dirname}/input.txt`, processLine);

  let result: number = 0;

  // Run through updates
  for (let i = 0; i < updates.length; i++) {
    const update: string[] = updates[i];
    const printedPages: Set<string> = new Set();

    // Assume update is valid by default
    let valid = true;

    for (let j = 0; j < update.length; j++) {
      const page = update[j];

      // Get pages that must come after
      const prereqs: Set<string> = ordering.get(page) || new Set();

      // Ensure that none of the pages that should come after have already been printed
      // @ts-ignore
      if (!prereqs.isDisjointFrom(printedPages)) {
        valid = false;
        break;
      }

      printedPages.add(page);
    }

    if (valid) {
      result += parseInt(update[Math.floor(update.length / 2)]);
    }
  }

  console.log(`Part 1: ${result}`);
}

part1();
