class TerminalView {
  constructor(terminal, parent) {
    this.terminal = terminal;
    this.parent = parent;
    this.connectionViews = [];
    this.listeners = {};

    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    // terminalSvg.setAttribute("cx", 0);
    // terminalSvg.setAttribute("cy", 28 + (28 + 14) * index);
    this.svg.setAttribute("r", 14);
    // group.appendChild(terminalSvg);
    this.svg.addEventListener("click", () => {
      this.dispatchEvent("click", this);
    });
  }

  setX(x) {
    this.svg.setAttribute("cx", x);
  }

  setY(y) {
    this.svg.setAttribute("cy", y);
  }

  getAbsoluteX() {
    return Number(this.svg.getAttribute("cx")) + this.parent.getX();
  }

  getAbsoluteY() {
    return Number(this.svg.getAttribute("cy")) + this.parent.getY();
  }

  addConnectionView(connectionView) {
    this.connectionViews.push(connectionView);
  }

  addEventListener(type, listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }

  dispatchEvent(type, args) {
    if (this.listeners[type]) {
      this.listeners[type].forEach((listener) => {
        listener(args);
      });
    }
  }

  mount(parent) {
    parent.appendChild(this.svg);
  }
}

export { TerminalView };
