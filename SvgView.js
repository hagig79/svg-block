const SvgView = function (svg) {
  this.element = svg;
  this.listeners = {};
};

SvgView.prototype.initialize = function () {
  setCanvasSize(this.element);
  drawGrid(this.element);
};

SvgView.prototype.addBlock = function (block) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("rx", "5");
  rect.setAttribute("x", 98);
  rect.setAttribute("y", 28);
  rect.setAttribute("width", 70);
  rect.setAttribute("height", 112);
  rect.setAttribute("fill", "#fff");
  rect.setAttribute("stroke", "#000");
  rect.addEventListener("click", () => {
    const event = new CustomEvent("block-select", {
      detail: { block: block },
    });
    rect.setAttribute("fill", "#b4e5f0");
    rect.setAttribute("stroke", "#0fb6d9");
    this.dispatchEvent(event);
  });
  let drag = false;
  let offsetX = 0;
  let offsetY = 0;
  rect.addEventListener("mousedown", (event) => {
    drag = true;
    offsetX = event.offsetX - Number(rect.getAttribute("x"));
    offsetY = event.offsetY - Number(rect.getAttribute("y"));
  });
  rect.addEventListener("touchstart", (event) => {
    event.preventDefault();
    drag = true;
    offsetX = event.touches[0].clientX - Number(rect.getAttribute("x"));
    offsetY = event.touches[0].clientY - Number(rect.getAttribute("y"));
  });
  rect.addEventListener("mousemove", (event) => {
    if (!drag) {
      return;
    }
    rect.setAttribute("x", event.touches.clientX - offsetX);
    rect.setAttribute("y", event.touches.clientY - offsetY);
  });
  rect.addEventListener("touchmove", (event) => {
    event.preventDefault();
    if (!drag) {
      return;
    }
    rect.setAttribute("x", event.touches[0].clientX - offsetX);
    rect.setAttribute("y", event.touches[0].clientY - offsetY);
  });
  rect.addEventListener("mouseup", () => {
    drag = false;
  });
  rect.addEventListener("touchend", (event) => {
    drag = false;
    event.preventDefault();
  });
  // rect.addEventListener("mouseout", () => {
  //   drag = false;
  // });
  this.element.appendChild(rect);

  const terminal1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  terminal1.setAttribute("cx", Number(rect.getAttribute("x")));
  terminal1.setAttribute("cy", Number(rect.getAttribute("y")) + 28);
  terminal1.setAttribute("r", 14);
  terminal1.setAttribute("fill", "#fff");
  terminal1.setAttribute("stroke", "#000");
  this.element.appendChild(terminal1);

  const terminal2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  terminal2.setAttribute("x", Number(rect.getAttribute("x")) + -10);
  terminal2.setAttribute("y", Number(rect.getAttribute("y")) + 70);
  terminal2.setAttribute("width", 28);
  terminal2.setAttribute("height", 28);
  terminal2.setAttribute("fill", "#fff");
  terminal2.setAttribute("stroke", "#000");
  this.element.appendChild(terminal2);

  const terminal3 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  terminal3.setAttribute("x", Number(rect.getAttribute("x")) + 50);
  terminal3.setAttribute("y", Number(rect.getAttribute("y")) + 40);
  terminal3.setAttribute("width", 28);
  terminal3.setAttribute("height", 28);
  terminal3.setAttribute("fill", "#fff");
  terminal3.setAttribute("stroke", "#000");
  this.element.appendChild(terminal3);
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

function drawGrid(svg) {
  const size = Math.max(
    Math.min(window.outerWidth, window.innerWidth),
    Math.min(window.outerHeight, window.innerHeight)
  );

  for (let i = 0; i * 10 < size; i++) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("x2", size);
    line.setAttribute("y1", 14 * i);
    line.setAttribute("y2", 14 * i);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-opacity", "0.1");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("shape-rendering", "crispEdges");
    svg.appendChild(line);
  }

  for (let i = 0; i * 10 < size; i++) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 14 * i);
    line.setAttribute("x2", 14 * i);
    line.setAttribute("y1", 0);
    line.setAttribute("y2", size);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-opacity", "0.1");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("shape-rendering", "crispEdges");
    svg.appendChild(line);
  }
}

SvgView.prototype.addEventListener = function (type, listener) {
  if (!this.listeners[type]) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(listener);
};

SvgView.prototype.dispatchEvent = function (event) {
  this.listeners[event.type].forEach((listener) => {
    listener(event);
  });
};
