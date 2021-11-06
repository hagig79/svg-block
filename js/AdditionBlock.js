import { Block } from "./Block.js";
import { Terminal } from "./Terminal.js";

class AdditionBlock extends Block {
  constructor() {
    super();

    this.inputTerminals.push(new Terminal("t1", "in", this));
    this.inputTerminals.push(new Terminal("t2", "in", this));
    this.outputTerminals.push(new Terminal("t3", "out", this));
  }

  evalute() {
    const v1 = this.inputTerminals[0].evalute();
    const v2 = this.inputTerminals[1].evalute();
    this.outputTerminals[0].setValue(v1 + v2);
  }
}

export { AdditionBlock };
