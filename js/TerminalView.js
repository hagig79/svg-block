const TerminalView = function () {};

TerminalView.prototype.setModel = function (model) {
  this.model = model;
};

TerminalView.prototype.setParent = function (parent) {
  this.parent = parent;
};

TerminalView.prototype.setWorkSheet = function (worksheet) {
  this.worksheet = worksheet;
};

TerminalView.prototype.getSvg = function () {
  const terminal = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  this.x = 0;
  this.y = 28;
  terminal.setAttribute("cx", this.x);
  terminal.setAttribute("cy", this.y);
  terminal.setAttribute("r", 14);

  terminal.addEventListener("click", () => {
    this.worksheet.selectTerminal(this);
  });

  this.svg = terminal;

  return this.svg;
};

TerminalView.prototype.selected = function () {};

TerminalView.prototype.getAbsoluteX = function () {
  return this.parent.x + this.x;
};

TerminalView.prototype.getAbsoluteY = function () {
  return this.parent.y + this.y;
};

TerminalView.prototype.connect = function (terminalView) {
  console.log("connect Terminal");
  this.model.connect(terminalView.model);
};
