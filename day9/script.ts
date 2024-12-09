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
        spaceRepresentation = ("" + fileCount + " ").repeat(value);
        fileCount++;
      } else {
        spaceRepresentation = ". ".repeat(value);
      }

      file = !file;
      memory += spaceRepresentation;
    }

    if (memory[memory.length - 1] == " ") {
      memory = memory.slice(0, -1);
    }

    //console.log(memory);
    //console.log("===================");

    // Move files over left
    memoryMap = memory.split(" ");
    let leftPointer = 0;
    let rightPointer = memoryMap.length - 1;

    //console.log(memoryMap);
    //console.log("===================");

    while (leftPointer < rightPointer) {
      while (memoryMap[leftPointer] != ".") {
        leftPointer++;
        if (leftPointer >= memoryMap.length) {
          break;
        }
      }

      while (memoryMap[rightPointer] == ".") {
        rightPointer--;
        if (rightPointer <= 0) {
          break;
        }
      }

      if (leftPointer >= rightPointer) {
        break;
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
