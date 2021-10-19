const Terminal = function (factory) {
  this.connectedTerminals = [];
  this.factory = factory;
  this.view = factory.createTerminalView();
  this.view.setModel(this);
};

Terminal.prototype.connect = function (terminal) {
  if (!this.connectedTerminals.includes(terminal)) {
    this.connectedTerminals.push(terminal);
    // this.view.connect(terminal.view);
  }
};
