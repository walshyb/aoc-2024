import { processInput } from "../common/utils";

async function part1(): Promise<void> {
  const grid: Node[][] = [];
  const j = 0;

  function processLine(line: string): void {
    const chars: string[] = line.split("");
  }

  await processInput(`${__dirname}/input.txt`, processLine);

  function dfs() {}
}

part1();

type NodeParams = {
  tl: Node | null;
  tm: Node | null;
  tr: Node | null;
  l: Node | null;
  r: Node | null;
  bl: Node | null;
  bm: Node | null;
  br: Node | null;
  val: string | null;
};

class Node {
  topLeft: Node | null = null;
  topMid: Node | null = null;
  topRight: Node | null = null;
  left: Node | null = null;
  right: Node | null = null;
  botLeft: Node | null = null;
  botMid: Node | null = null;
  botRight: Node | null = null;

  val: null | string;

  constructor(params: NodeParams) {
    this.topLeft = params.tl;
    this.topMid = params.tm;
    this.topRight = params.tr;
    this.left = params.l;
    this.right = params.r;
    this.botLeft = params.bl;
    this.botMid = params.bm;
    this.botRight = params.br;
  }
}
