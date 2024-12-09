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

async function part2(): Promise<void> {
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
    const printedPages: string[] = [];
    let valid: boolean = true;

    for (let j = 0; j < update.length; j++) {
      const page = update[j];

      // Get pages that must come after
      const prereqs: Set<string> = ordering.get(page) || new Set();

      // Get a set of pages that have been printed before they should have.
      // This is done by intersecting the current page's "prereqs", or pages that have to
      // come after, and the pages that have already been printed
      // @ts-ignore
      const sect: Set<string> = prereqs.intersection(new Set(printedPages));

      // If page that should come after was printed before current
      if (sect.size) {
        // Loop through set of pages that should come after the current page
        const sectIterator: IterableIterator<string> = sect.values();
        let iteratorResult: IteratorResult<string> = sectIterator.next();

        // Get the index of the first "bad" page
        let minIndex = printedPages.indexOf(iteratorResult.value);

        // If there are still more "bad" pages in the set,
        // get the lowest index of the bad pages
        while (!iteratorResult.done) {
          minIndex = Math.min(
            minIndex,
            printedPages.indexOf(iteratorResult.value),
          );
          iteratorResult = sectIterator.next();
        }

        // Insert the current page before the lowest index "bad" page
        printedPages.splice(minIndex, 0, page);
        valid = false;
      } else {
        printedPages.push(page);
      }
    }

    // Only add up middles for bad updates
    if (!valid)
      result += parseInt(printedPages[Math.floor(printedPages.length / 2)]);
  }

  console.log(`Part 2: ${result}`);
}

part2();
