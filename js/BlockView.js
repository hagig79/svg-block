import { TerminalView } from "./TerminalView.js";

class BlockView {
  terminalViews = new Map();

  constructor(block) {
    this.block = block;
    this.listeners = {};

    this.x = 42;
    this.y = 42;

    let drag = false;
    let currentX = 42;
    let currentY = 42;
    let offsetX = 0;
    let offsetY = 0;

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("fill", "#fff");
    group.setAttribute("stroke", "#000");
    group.setAttribute(
      "transform",
      "translate(" + this.x + ", " + this.y + ")"
    );
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("rx", "5");
    rect.setAttribute("x", 0);
    rect.setAttribute("y", 0);
    rect.setAttribute("width", 70);
    rect.setAttribute("height", Math.max(this.block.inputTerminals.length, this.block.outputTerminals.length) * 3 * 14 + 14);
    group.appendChild(rect);

    const dragStart = (blockView, x, y) => {
      drag = true;
      offsetX = x - currentX;
      offsetY = y - currentY;

      this.dispatchEvent("blockClick", this);
      // if (this.currentBlock) {
      //   this.currentBlock.setAttribute("fill", "#fff");
      //   this.currentBlock.setAttribute("stroke", "#000");
      // }
      // this.currentBlock = blockView;
      // blockView.setAttribute("fill", "#b4e5f0");
      // blockView.setAttribute("stroke", "#0fb6d9");
      // if (this.currentTerminal) {
      //   this.actionLayer.setAttribute("visibility", "hidden");
      //   this.currentTerminal = null;
      // }
    };
    const dragMove = (rect, x, y) => {
      if (!drag) {
        return;
      }
      currentX = x - offsetX;
      currentY = y - offsetY;
      this.setPosition(currentX, currentY);
    };
    const dragEnd = () => {
      drag = false;
    };
    rect.addEventListener("mousedown", (event) => {
      dragStart(null, event.offsetX, event.offsetY);
    });
    rect.addEventListener("touchstart", (event) => {
      event.preventDefault();
      dragStart(null, event.touches[0].clientX, event.touches[0].clientY);
    });
    rect.addEventListener("mousemove", (event) => {
      dragMove(null, event.offsetX, event.offsetY);
    });
    rect.addEventListener("touchmove", (event) => {
      event.preventDefault();
      dragMove(null, event.touches[0].clientX, event.touches[0].clientY);
    });
    rect.addEventListener("mouseup", () => {
      dragEnd();
    });
    rect.addEventListener("touchend", (event) => {
      dragEnd();
      event.preventDefault();
    });

    this.group = group;

    block.inputTerminals.forEach((terminal, index) => {
      const terminalView = new TerminalView(terminal, this);
      terminalView.setY(28 + (28 + 14) * index);
      terminalView.mount(group);
      terminalView.addEventListener("click", (terminalView) => {
        this.dispatchEvent("terminalClick", terminalView);
      });
      this.terminalViews.set(terminal, terminalView);
    });
    block.outputTerminals.forEach((terminal, index) => {
      const terminalView = new TerminalView(terminal, this);
      terminalView.setX(70);
      terminalView.setY(28 + (28 + 14) * index);
      terminalView.mount(group);
      terminalView.addEventListener("click", (terminalView) => {
        this.dispatchEvent("terminalClick", terminalView);
      });
      this.terminalViews.set(terminal, terminalView);
    });
  }

  mount(svg, viewManager) {
    viewManager.set(this.block, this);
    this.terminalViews.forEach((view, model) => {
      viewManager.set(model, view);
    });

    svg.appendChild(this.group);
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.group.setAttribute(
      "transform",
      "translate(" + this.x + ", " + this.y + ")"
    );

    this.terminalViews.forEach((terminalView) => {
      terminalView.connectionViews.forEach((connectionView) => {
        connectionView.redraw();
      });
    });
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
}

export { BlockView };
