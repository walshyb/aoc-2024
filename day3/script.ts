import { processInput } from "../common/utils";

async function part1(): Promise<void> {
  let results: number = 0;
  const validTokens: Set<string> = new Set([
    "m",
    "u",
    "l",
    "(",
    ")",
    ",",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]);

  // almost an ast
  const ast: any = {
    m: {
      u: {
        l: {
          "(": {
            ",": {
              ")": {},
            },
          },
        },
      },
    },
  };

  function processLine(line: string): void {
    let op1: number = 0;
    let op2: number = 0;
    let i = 0;
    let tree: any = { ...ast };
    let currentToken = "";
    let previousToken = "";

    function reset(): void {
      tree = { ...ast };
      currentToken = "";
      previousToken = "";
      op1 = 0;
      op2 = 0;
    }

    function getOperand(): number {
      let operand: string = "";
      let j = 1;
      while (j <= 3) {
        const num: string = line[i + j];
        if (!isNaN(parseInt(num))) {
          operand += num;
        } else {
          break;
        }
        j++;
      }

      i += operand.length;
      return parseInt(operand);
    }

    // this would work so much better functionally
    while (i < line.length) {
      const char: string = line[i];

      // Reset if token is not valid
      if (!validTokens.has(char)) {
        reset();
        i++;
        continue;
      }

      //console.log(char, tree);

      switch (char) {
        case "m":
        case "u":
        case "l":
          if (!tree.hasOwnProperty(char)) {
            reset();
            break;
          }
          previousToken = currentToken;
          currentToken = currentToken + char;
          tree = tree[char];
          break;
        case "(":
          if (!tree.hasOwnProperty("(")) {
            reset();
            break;
          }
          op1 = getOperand();
          console.log("op1", op1);
          previousToken = "(";
          currentToken = "";
          tree = tree["("];
          break;
        case ",":
          if (!tree.hasOwnProperty(",")) {
            reset();
            break;
          }
          op2 = getOperand();
          console.log("op2", op2);
          previousToken = ",";
          currentToken = "";
          tree = tree[","];
          break;
        case ")":
          if (tree.hasOwnProperty(")")) {
            results += op1 * op2;
          }
          reset();
          break;
        default:
          reset();
          break;
      }

      i += 1;
    }
  }
  // Read input
  await processInput(`${__dirname}/input.txt`, processLine);

  console.log(`Part 1: ${results}`);
}

part1();
