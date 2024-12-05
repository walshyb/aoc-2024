import fs from "fs";
import readline from "readline";

export async function processInput(
  path: string,
  callback: Function,
): Promise<void> {
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    callback(line);
  }
}
