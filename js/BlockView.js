const BlockView = function () {
  this.worksheet = null;
  this.model = null;
  this.svg = null;
  this.x = 0;
  this.y = 0;
  this.width = 70;
  this.height = 112;
};

BlockView.prototype.setWorkSheet = function (worksheet) {
  this.worksheet = worksheet;
  this.model.terminals.forEach((terminal) => {
    terminal.view.setWorkSheet(worksheet);
  });
};

BlockView.prototype.setModel = function (model) {
  this.model = model;
};

BlockView.prototype.getSvg = function () {
  this.x = this.worksheet.getBaseSize() * 5;
  this.y = this.worksheet.getBaseSize() * 2;
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("fill", "#fff");
  g.setAttribute("stroke", "#000");
  g.setAttribute("transform", "translate(" + this.x + ", " + this.y + ")");
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("rx", "5");
  rect.setAttribute("x", 0);
  rect.setAttribute("y", 0);
  rect.setAttribute("width", 70);
  rect.setAttribute("height", 112);
  rect.addEventListener("click", () => {
    this.worksheet.selectBlock(this);
    // const event = new CustomEvent("block-select", {
    //   detail: { block: block },
    // });
    // this.dispatchEvent(event);
  });
  let drag = false;
  let offsetX = 0;
  let offsetY = 0;
  rect.addEventListener("mousedown", (event) => {
    drag = true;
    // offsetX = event.offsetX - Number(rect.getAttribute("x"));
    // offsetY = event.offsetY - Number(rect.getAttribute("y"));
    offsetX = event.offsetX - this.x;
    offsetY = event.offsetY - this.y;
  });
  rect.addEventListener("touchstart", (event) => {
    event.preventDefault();
    drag = true;
    offsetX = event.touches[0].clientX - this.x;
    offsetY = event.touches[0].clientY - this.y;
  });
  rect.addEventListener("mousemove", (event) => {
    if (!drag) {
      return;
    }
    // rect.setAttribute("x", event.clientX - offsetX);
    // rect.setAttribute("y", event.clientY - offsetY);
    this.x = event.offsetX - offsetX;
    this.y = event.offsetY - offsetY;
    g.setAttribute("transform", "translate(" + this.x + ", " + this.y + ")");
  });
  rect.addEventListener("touchmove", (event) => {
    event.preventDefault();
    if (!drag) {
      return;
    }
    this.x = event.touches[0].clientX - offsetX;
    this.y = event.touches[0].clientY - offsetY;
    g.setAttribute("transform", "translate(" + this.x + ", " + this.y + ")");
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
  //   this.blockLayer.appendChild(g);
  g.appendChild(rect);

  this.model.terminals.forEach((terminal) => {
    g.appendChild(terminal.view.getSvg());
  });

  //   const terminal1 = document.createElementNS(
  //     "http://www.w3.org/2000/svg",
  //     "circle"
  //   );
  //   terminal1.setAttribute("cx", Number(rect.getAttribute("x")));
  //   terminal1.setAttribute("cy", Number(rect.getAttribute("y")) + 28);
  //   terminal1.setAttribute("r", this.parent.getBaseSize());
  //   terminal1.addEventListener("click", () => {
  //     this.parent.selectTerminal(
  //       this.x + Number(terminal1.getAttribute("cx")),
  //       this.y + Number(terminal1.getAttribute("cy"))
  //     );
  //   });
  //   g.appendChild(terminal1);

  //   const terminal2 = document.createElementNS(
  //     "http://www.w3.org/2000/svg",
  //     "rect"
  //   );
  //   terminal2.setAttribute(
  //     "x",
  //     Number(rect.getAttribute("x")) + -this.parent.getBaseSize()
  //   );
  //   terminal2.setAttribute("y", Number(rect.getAttribute("y")) + 70);
  //   terminal2.setAttribute("width", 28);
  //   terminal2.setAttribute("height", 28);
  //   g.appendChild(terminal2);

  //   const terminal3 = document.createElementNS(
  //     "http://www.w3.org/2000/svg",
  //     "rect"
  //   );
  //   terminal3.setAttribute(
  //     "x",
  //     Number(rect.getAttribute("x")) + this.parent.getBaseSize() * 4
  //   );
  //   terminal3.setAttribute(
  //     "y",
  //     Number(rect.getAttribute("y")) + this.parent.getBaseSize() * 3
  //   );
  //   terminal3.setAttribute("width", 28);
  //   terminal3.setAttribute("height", 28);
  //   g.appendChild(terminal3);

  this.svg = g;

  return g;
};

BlockView.prototype.selected = function () {
  this.svg.setAttribute("fill", "#b4e5f0");
  this.svg.setAttribute("stroke", "#0fb6d9");
};

BlockView.prototype.unselected = function () {
  this.svg.setAttribute("fill", "#fff");
  this.svg.setAttribute("stroke", "#000");
};
