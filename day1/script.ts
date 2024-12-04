#!/usr/bin/env node

import fs from "fs";
import readline from "readline";

async function part1(): Promise<void> {
  let leftList: number[] = [];
  let rightList: number[] = [];

  async function processLineByLine(): Promise<void> {
    const fileStream = fs.createReadStream("input.txt");

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const [left, right] = line.split("   ");

      leftList.push(parseInt(left));
      rightList.push(parseInt(right));
    }
  }

  // Read input
  await processLineByLine();

  // Sort input
  // Much faster to sort in min heap as we're reading input
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  let distances: number = 0;

  for (let i = 0; i < leftList.length; i++) {
    distances += Math.abs(leftList[i] - rightList[i]);
  }

  console.log(`Part 1: ${distances}`);
}

part1();

async function part2(): Promise<void> {
  let leftList: number[] = [];
  let rightFrequency: Map<number, number> = new Map();

  async function processLineByLine(): Promise<void> {
    const fileStream = fs.createReadStream("input.txt");

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const [left, unparsedRight] = line.split("   ");

      leftList.push(parseInt(left));

      const right: number = parseInt(unparsedRight);
      const currentRightFreq: number = rightFrequency.get(right) || 0;

      rightFrequency.set(right, currentRightFreq + 1);
    }
  }

  // Read input
  await processLineByLine();

  let similarities: number = 0;

  for (let i = 0; i < leftList.length; i++) {
    similarities += leftList[i] * (rightFrequency.get(leftList[i]) || 0);
  }

  console.log(`Part 2: ${similarities}`);
}

part2();
