import { Block } from "./Block.js";
import { Terminal } from "./Terminal.js";

class ConstantBlock extends Block {
  constructor() {
    super();

    this.outputTerminals.push(new Terminal("t1", "out", this));
  }

  evalute() {
    this.outputTerminals[0].setValue(1);
  }
}

export { ConstantBlock };
