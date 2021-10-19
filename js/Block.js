const Block = function (factory) {
  this.view = factory.createBlockView();
  this.terminals = [];

  const terminal1 = new Terminal(factory);
  terminal1.view.setParent(this.view);
  this.terminals.push(terminal1);

  this.view.setModel(this);
};
