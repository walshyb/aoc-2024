import { processInput } from "../common/utils";
import * as fs from "fs";

function fixLeadingZeroes(num: string): string {
  return parseInt(num).toString();
}

async function part1(): Promise<void> {
  let line: string[] = [];

  function processLine(input: string): void {
    line = input.split(" ");
  }

  await processInput(`${__dirname}/input.txt`, processLine);

  const memo: Map<string, string[]> = new Map();

  for (let i = 0; i < 25; i++) {
    let newLine = [];

    line.forEach((str: string) => {
      if (str === "0") {
        newLine.push("1");
        return;
      }

      if (str.length % 2 == 0) {
        const size = str.length / 2;
        newLine.push(fixLeadingZeroes(str.slice(0, size)));
        newLine.push(fixLeadingZeroes(str.slice(size)));
        return;
      }

      const num: number = parseInt(str);
      newLine.push((num * 2024).toString());
    });

    line = newLine;
  }

  console.log(`Part 1: ${line.length}`);
}

part1();
