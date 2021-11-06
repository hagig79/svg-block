import { Block } from "./Block.js";
import { Terminal } from "./Terminal.js";

class OutputBlock extends Block {
  constructor() {
    super();

    this.inputTerminals.push(new Terminal("t1", "in", this));
  }

  evalute() {
    const value = this.inputTerminals[0].evalute();
    console.log(value);
  }
}

export { OutputBlock };
