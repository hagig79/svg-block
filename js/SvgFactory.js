const SvgFactory = function (svgElement) {
  this.svgElement = svgElement;
};

SvgFactory.prototype.createWorkSheetView = function () {
  return new WorkSheetView(this.svgElement);
};

SvgFactory.prototype.createBlockView = function () {
  return new BlockView();
};
SvgFactory.prototype.createTerminalView = function () {
  return new TerminalView();
};
