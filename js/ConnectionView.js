class ConnectionView {
  constructor(terminalView1, terminalView2, svg) {
    this.svg = svg;
    if (terminalView1.terminal.type === "out") {
      this.terminalView1 = terminalView1;
      this.terminalView2 = terminalView2;
    } else {
      this.terminalView1 = terminalView2;
      this.terminalView2 = terminalView1;
    }
    this.redraw();
  }

  redraw() {
    let points = "";
    points += this.terminalView1.getAbsoluteX() + ",";
    points += this.terminalView1.getAbsoluteY() + ",";

    if (
      this.terminalView1.getAbsoluteX() + 14 * 2 >
      this.terminalView2.getAbsoluteX() - 14 * 2
    ) {
      const y =
        (this.terminalView1.getAbsoluteY() +
          this.terminalView2.getAbsoluteY() +
          4 * 14) /
        2;

      points += this.terminalView1.getAbsoluteX() + 14 * 2 + ",";
      points += this.terminalView1.getAbsoluteY() + ",";

      points += this.terminalView1.getAbsoluteX() + 14 * 2 + ",";
      points += y + ",";

      points += this.terminalView2.getAbsoluteX() - 14 * 2 + ",";
      points += y + ",";

      points += this.terminalView2.getAbsoluteX() - 14 * 2 + ",";
      points += this.terminalView2.getAbsoluteY() + ",";
    } else {
      const x =
        (this.terminalView1.getAbsoluteX() +
          this.terminalView2.getAbsoluteX()) /
        2;

      points += x + ",";
      points += this.terminalView1.getAbsoluteY() + ",";

      points += x + ",";
      points += this.terminalView2.getAbsoluteY() + ",";
    }

    points += this.terminalView2.getAbsoluteX() + ",";
    points += this.terminalView2.getAbsoluteY();
    this.svg.setAttribute("points", points);
  }
}

export { ConnectionView };
