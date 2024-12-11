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

//part1();

async function part2(): Promise<void> {
  let checksum: number = 0;
  let memory: string = "";
  let fileCount: number = 0;
  let memoryMap: string[];
  const sizeMap: Map<string, number> = new Map();

  // Index is fileId, value is starting index
  const fileStarts: Map<string, number> = new Map();

  function processLine(line: string): void {
    // Generate memory
    let file: boolean = true;

    for (let i = 0; i < line.length; i++) {
      const char: string = line[i];
      const value: number = parseInt(char);
      let spaceRepresentation: string;

      if (file) {
        sizeMap.set(fileCount.toString(), value);
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
    console.log("===================");

    // Move files over left
    memoryMap = memory.split(" ");

    // Keep track of file starting positions
    for (let i = 0; i < memoryMap.length; i++) {
      if (memoryMap[i] == "." || fileStarts.has(memoryMap[i])) continue;

      fileStarts.set(memoryMap[i], i);
    }

    //console.log(memoryMap);
    //console.log("===================");

    // Loop through files-size map (in reverse)
    // and place entire file in first free space that can hold it
    for (let [fileId, fileSize] of Array.from(sizeMap).reverse()) {
      if (fileId == "0") continue;

      let memoryStart = 0;
      let originalFileIndex: number = -1;

      // Loop through the memory map!
      for (let i = 0; i < memoryMap.length; i++) {
        if (memoryMap[i] !== ".") continue;
        let freespaceSize = 1;

        // Look for `.` and count how many dots follow until fileSize
        let j = i;
        while (
          j + 1 < fileStarts.get(fileId) &&
          freespaceSize <= fileSize &&
          j + 1 < memoryMap.length &&
          memoryMap[j + 1] == "."
        ) {
          freespaceSize++;
          j++;
        }

        if (j >= fileStarts.get(fileId)) {
          break;
        }

        if (freespaceSize >= fileSize) {
          //console.log(fileId, i, j);
          memoryStart = i;

          originalFileIndex = fileStarts.get(fileId);
          break;
        }
      }

      // No match
      if (originalFileIndex === -1) {
        //console.log("no match for file", fileId);
        continue;
      }

      // If we found a match, replace those values with the fileId
      for (let i = memoryStart; i < memoryStart + fileSize; i++) {
        memoryMap[i] = fileId;
      }

      // Replace original file positions with dots
      for (let i = originalFileIndex; i < originalFileIndex + fileSize; i++) {
        memoryMap[i] = ".";
      }

      // Remove fileId from map
      sizeMap.delete(fileId);
      fileStarts.delete(fileId);

      //console.log(fileId, memoryMap);
    }

    // Calculate checksum
    for (let i = 0; i < memoryMap.length; i++) {
      if (parseInt(memoryMap[i])) checksum += i * parseInt(memoryMap[i]);
    }

    console.log("part 2", checksum);
  }

  await processInput(`${__dirname}/input.txt`, processLine);
}

part1();
part2();
