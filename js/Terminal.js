class Terminal {
  constructor(name, type, parent) {
    this.name = name;
    this.type = type;
    this.evaluted = false;
    this.parent = parent;
  }

  evalute() {
    if (this.type === "in") {
      const t = this.connection.getAnotherTerminal();
      return t.evalute();
    } else {
      if (!this.evaluted) {
        this.parent.evalute();
        this.evaluted = true;
      }
      return this.value;
    }
  }

  setConnection(connection) {
    this.connection = connection;
  }

  setValue(value) {
    this.value = value;
  }
}

export { Terminal };
