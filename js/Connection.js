class Connection {
  constructor(t1, t2) {
    this.terminal1 = t1;
    this.terminal1.setConnection(this);
    this.terminal2 = t2;
    this.terminal2.setConnection(this);
  }

  getAnotherTerminal(terminal) {
    if (terminal == this.terminal1) {
      return this.terminal2;
    } else {
      return this.terminal1;
    }
  }
}

export { Connection };
