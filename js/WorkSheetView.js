const WorkSheetView = function (svg) {
  this.svgElement = svg;
  this.listeners = {};
  this.currentBlock = null;

  window.addEventListener("resize", () => {
    console.log("resized");
    setCanvasSize(this.svgElement);
  });
};

WorkSheetView.prototype.initialize = function () {
  setCanvasSize(this.svgElement);
  const gridLayer = drawGrid();
  this.svgElement.appendChild(gridLayer);

  const background = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  background.setAttribute("x", 0);
  background.setAttribute("y", 0);
  background.setAttribute("width", 2000);
  background.setAttribute("height", 2000);
  background.setAttribute("fill", "rgba(0, 0, 0, 0)");
  this.svgElement.appendChild(background);
  background.addEventListener("click", () => {
    if (this.currentBlock) {
      this.currentBlock.unselected();
      this.currentBlock = null;
    }
    if (this.currentTerminal) {
      this.actionLayer.setAttribute("visibility", "hidden");
      this.currentTerminal = null;
    }
  });

  this.blockLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.svgElement.appendChild(this.blockLayer);

  this.actionLayer = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );
  this.svgElement.appendChild(this.actionLayer);

  this.linkLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  this.linkLine.setAttribute("stroke", "#d9370f");
  this.linkLine.setAttribute("stroke-width", "5");
  this.actionLayer.appendChild(this.linkLine);

  this.svgElement.addEventListener("mousemove", (event) => {
    this.linkLine.setAttribute("x2", event.offsetX);
    this.linkLine.setAttribute("y2", event.offsetY);
  });
  this.linkLine.setAttribute("pointer-events", "none");

  this.linkTerminal1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  this.linkTerminal1.setAttribute("r", GRID_SIZE);
  this.linkTerminal1.setAttribute("fill", "#f0bfb4");
  this.linkTerminal1.setAttribute("stroke", "#d9370f");
  this.linkTerminal1.addEventListener("click", () => {
    this.actionLayer.setAttribute("visibility", "hidden");
    this.currentTerminal = null;
  });
  this.actionLayer.appendChild(this.linkTerminal1);

  this.actionLayer.setAttribute("visibility", "hidden");
};

WorkSheetView.prototype.selectBlock = function (blockView) {
  if (this.currentBlock) {
    this.currentBlock.unselected();
    this.currentBlock = null;
  }
  if (this.currentTerminal) {
    this.actionLayer.setAttribute("visibility", "hidden");
    this.currentTerminal = null;
  }
  blockView.selected();
  this.currentBlock = blockView;
};

WorkSheetView.prototype.selectTerminal = function (terminalView) {
  if (this.currentBlock) {
    this.currentBlock.unselected();
    this.currentBlock = null;
  }
  if (this.terminalView == terminalView) {
    this.actionLayer.setAttribute("visibility", "hidden");
    this.currentTerminal = null;
    return;
  }
  if (!this.currentTerminal) {
    this.currentTerminal = terminalView;
    this.linkTerminal1.setAttribute("cx", terminalView.getAbsoluteX());
    this.linkTerminal1.setAttribute("cy", terminalView.getAbsoluteY());

    this.linkLine.setAttribute("x1", terminalView.getAbsoluteX());
    this.linkLine.setAttribute("y1", terminalView.getAbsoluteY());
    this.actionLayer.setAttribute("visibility", "visible");
  } else {
    this.currentTerminal.connect(terminalView);
  }
};

const GRID_SIZE = 14;

WorkSheetView.prototype.addBlock = function (block) {
  block.view.setWorkSheet(this);
  this.blockLayer.appendChild(block.view.getSvg());
};

function setCanvasSize(svg) {
  const nav = document.querySelector("#nav");
  const width = Math.min(window.outerWidth, window.innerWidth);
  const height =
    Math.min(window.outerHeight, window.innerHeight) - nav.clientHeight;
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", "0,0," + width + "," + height);
}

function drawGrid() {
  const gridLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const size = Math.max(
    Math.min(window.outerWidth, window.innerWidth),
    Math.min(window.outerHeight, window.innerHeight)
  );

  for (let i = 0; i * 10 < size; i++) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("x2", size);
    line.setAttribute("y1", GRID_SIZE * i);
    line.setAttribute("y2", GRID_SIZE * i);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-opacity", "0.1");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("shape-rendering", "crispEdges");
    gridLayer.appendChild(line);
  }

  for (let i = 0; i * 10 < size; i++) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", GRID_SIZE * i);
    line.setAttribute("x2", GRID_SIZE * i);
    line.setAttribute("y1", 0);
    line.setAttribute("y2", size);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-opacity", "0.1");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("shape-rendering", "crispEdges");
    gridLayer.appendChild(line);
  }

  return gridLayer;
}

WorkSheetView.prototype.addEventListener = function (type, listener) {
  if (!this.listeners[type]) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(listener);
};

WorkSheetView.prototype.dispatchEvent = function (event) {
  this.listeners[event.type].forEach((listener) => {
    listener(event);
  });
};

WorkSheetView.prototype.getBaseSize = function () {
  return GRID_SIZE;
};
