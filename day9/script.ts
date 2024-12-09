import { processInput } from "../common/utils";

async function part1(): Promise<void> {
  let checksum: number = 0;
  let memory: string = "";
  let fileCount: number = 0;
  let memoryMap: string[];

  function processLine(line: string): void {
    // Generate memory
    let file: boolean = true;

    for (let i = 0; i < line.length; i++) {
      const char: string = line[i];
      const value: number = parseInt(char);
      let spaceRepresentation: string;

      if (file) {
        spaceRepresentation = fileCount.toString().repeat(value);
        fileCount++;
      } else {
        spaceRepresentation = ".".repeat(value);
      }

      file = !file;
      memory += spaceRepresentation;
    }

    // Move files over left
    let leftPointer = 0;
    let rightPointer = memory.length - 1;
    memoryMap = memory.split("");

    while (leftPointer < rightPointer) {
      while (memoryMap[leftPointer] != ".") {
        leftPointer++;
      }

      while (memoryMap[rightPointer] == ".") {
        rightPointer--;
      }

      memoryMap[leftPointer] = memoryMap[rightPointer];
      memoryMap[rightPointer] = ".";
      leftPointer++;
      rightPointer--;
    }

    // Calculate checksum
    for (let i = 0; i < memoryMap.length; i++) {
      if (parseInt(memoryMap[i])) checksum += i * parseInt(memoryMap[i]);
    }
  }

  await processInput(`${__dirname}/input.txt`, processLine);

  console.log("part 1", checksum);
}

part1();
