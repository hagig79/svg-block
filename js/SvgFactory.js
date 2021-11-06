const SvgFactory = function (svgElement) {
  this.svgElement = svgElement;
};

SvgFactory.prototype.createWorkSheetView = function (model) {
  return new WorkSheetView(model, this.svgElement);
};

SvgFactory.prototype.createBlockView = function () {
  return new BlockView();
};
SvgFactory.prototype.createTerminalView = function () {
  return new TerminalView();
};
