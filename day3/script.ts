import { processInput } from "../common/utils";

async function run(partNumber: number): Promise<void> {
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
    "d",
    "o",
    "n",
    "'",
    "t",
  ]);

  // almost an ast? or maybe it's a real one :)
  const ast: any = {
    d: {
      o: {
        "(": {
          ")": {},
        },
        n: {
          "'": {
            t: {
              "(": {
                ")": {},
              },
            },
          },
        },
      },
    },
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

  // Define vars outside of processLine func
  // bc we want to keep state (ignoring the index)
  // throughout the line processing
  let results: number = 0;
  let op1: number = 0;
  let op2: number = 0;
  let tree: any = { ...ast };
  let currentToken = "";
  let previousToken = "";
  let mulEnabled: boolean = true;

  function processLine(line: string): void {
    let i = 0;

    function reset(): void {
      tree = { ...ast };
      currentToken = "";
      previousToken = "";
      op1 = 0;
      op2 = 0;
    }

    /**
     * Move up to 3 characters forward and grab any numbers
     *
     * Set index to character immediately after last number found
     */
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

      /**
       * Since we know the current character is valid, we walk it down our AST.
       * i.e. if current char is "m" then set the current tree state to ast['m'],
       * or if "u" then ast['m']['u'] (and so on). Visually: m->u->l->( .....
       *
       * If at any point the current character is not in the subtree, we "reset",
       * or ignore everything we've seen up to that point and start checking over again
       *
       * We also keep track of the current instruction we're on: 'mul', 'do', or "don't"
       *
       * When we come across '(', or ',', then we check the next 3 chars for number operands
       *
       */
      switch (char) {
        case "d":
        case "o":
        case "n":
        case "'":
        case "t":
        case "m":
        case "u":
        case "l":
          if (!tree.hasOwnProperty(char)) {
            reset();
            break;
          }
          currentToken = currentToken + char;
          tree = tree[char];
          break;
        case "(":
          if (!tree.hasOwnProperty("(")) {
            reset();
            break;
          }
          if (currentToken == "mul") {
            op1 = getOperand();
          }
          tree = tree["("];
          break;
        case ",":
          if (!tree.hasOwnProperty(",")) {
            reset();
            break;
          }
          op2 = getOperand();
          tree = tree[","];
          break;
        case ")":
          if (tree.hasOwnProperty(")")) {
            if (partNumber == 1 || (currentToken === "mul" && mulEnabled)) {
              results += op1 * op2;
            } else if (currentToken === "do") {
              mulEnabled = true;
            } else if (currentToken == "don't") {
              mulEnabled = false;
            }
          }
        default:
          reset();
          break;
      }

      i += 1;
    }
  }

  // Read input
  await processInput(`${__dirname}/input.txt`, processLine);

  console.log(`Part ${partNumber}: ${results}`);
}

run(1);

run(2);
