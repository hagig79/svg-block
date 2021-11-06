import { BlockView } from "./BlockView.js";
import { TerminalView } from "./TerminalView.js";
import { ConnectionView } from "./ConnectionView.js";
import { Connection } from "./Connection.js";
import { ViewManager } from "./ViewManager.js";

const GRID_SIZE = 14;

class WorkSheetView {
  worksheet = null;
  workSheetSvg = null;
  svgElement = null;
  blockLayer = null;
  actionLayer = null;
  currentBlock = null;
  currentTerminal = null;
  pubsub = null;
  blocks = new Map();
  terminals = new Map();

  constructor(worksheet) {
    this.worksheet = worksheet;
    this.viewManager = new ViewManager();
  }

  mount(svg) {
    this.svgElement = svg;
    const gridLayer = this.drawGrid();
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
        // this.currentBlock.unselected();
        this.currentBlock.setAttribute("fill", "#fff");
        this.currentBlock.setAttribute("stroke", "#000");
        this.currentBlock = null;
      }
      if (this.currentTerminalView) {
        this.actionLayer.setAttribute("visibility", "hidden");
        this.currentTerminalView = null;
      }
    });

    this.connectionLayer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    this.svgElement.appendChild(this.connectionLayer);

    this.blockLayer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
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
  }

  drawGrid() {
    const gridLayer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    const max = 4000;

    for (let i = 0; i * 10 < max; i++) {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", 0);
      line.setAttribute("x2", max);
      line.setAttribute("y1", GRID_SIZE * i);
      line.setAttribute("y2", GRID_SIZE * i);
      line.setAttribute("stroke", "black");
      line.setAttribute("stroke-opacity", "0.1");
      line.setAttribute("stroke-width", "1");
      line.setAttribute("shape-rendering", "crispEdges");
      gridLayer.appendChild(line);
    }

    for (let i = 0; i * 10 < max; i++) {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", GRID_SIZE * i);
      line.setAttribute("x2", GRID_SIZE * i);
      line.setAttribute("y1", 0);
      line.setAttribute("y2", max);
      line.setAttribute("stroke", "black");
      line.setAttribute("stroke-opacity", "0.1");
      line.setAttribute("stroke-width", "1");
      line.setAttribute("shape-rendering", "crispEdges");
      gridLayer.appendChild(line);
    }

    return gridLayer;
  }

  addBlockView(block, blockView) {
    blockView.addEventListener("blockClick", (blockView) => {
      console.log("blockClick");
    });
    this.blocks.set(block, blockView);

    blockView.mount(this.blockLayer, this.viewManager);
    blockView.addEventListener("terminalClick", (terminalView) => {
      console.log("terminalClick");
      if (this.currentTerminalView) {
        this.worksheet.connect(
          this.currentTerminalView.terminal,
          terminalView.terminal
        );
        this.actionLayer.setAttribute("visibility", "hidden");
        this.currentTerminalView = null;
      } else {
        this.selectTerminal(terminalView);
      }
    });
  }

  setPubSub(pubsub) {
    this.pubsub = pubsub;

    this.pubsub.subscribe("blockAdded", (block) => {
      const blockView = new BlockView(block);
      this.addBlockView(block, blockView);
    });

    this.pubsub.subscribe("terminalConnected", (connection) => {
      const connectionSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polyline"
      );
      console.log(this.viewManager);
      console.log(connection);
      const t1 = this.viewManager.get(connection.terminal1);
      console.log(t1);

      const t2 = this.viewManager.get(connection.terminal2);
      console.log(t2);

      const connectionView = new ConnectionView(t1, t2, connectionSvg);
      t1.addConnectionView(connectionView);
      t2.addConnectionView(connectionView);

      connectionSvg.setAttribute("fill", "none");
      connectionSvg.setAttribute("stroke", "black");
      connectionSvg.setAttribute("stroke-width", "1");
      this.connectionLayer.appendChild(connectionSvg);
    });
  }

  selectTerminal(terminalView) {
    // if (this.currentBlock) {
    //   this.currentBlock.setAttribute("fill", "#fff");
    //   this.currentBlock.setAttribute("stroke", "#000");
    //   this.currentBlock = null;
    // }
    this.currentTerminalView = terminalView;
    this.actionLayer.setAttribute("visibility", "visible");

    this.linkTerminal1.setAttribute("cx", terminalView.getAbsoluteX());
    this.linkTerminal1.setAttribute("cy", terminalView.getAbsoluteY());
    this.linkLine.setAttribute("x1", terminalView.getAbsoluteX());
    this.linkLine.setAttribute("y1", terminalView.getAbsoluteY());
  }

  connectTerminal(terminal1, terminal2) {
    console.log("connect terminal");
  }
}

export { WorkSheetView };
