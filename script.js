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
    line.setAttribute("y1", 10 * i);
    line.setAttribute("y2", 10 * i);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-opacity", "0.1");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("shape-rendering", "crispEdges");
    svg.appendChild(line);
  }
  for (let i = 0; i * 10 < size; i++) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 10 * i);
    line.setAttribute("x2", 10 * i);
    line.setAttribute("y1", 0);
    line.setAttribute("y2", size);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-opacity", "0.1");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("shape-rendering", "crispEdges");
    svg.appendChild(line);
  }
}

function addBlock(svg) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", 100);
  rect.setAttribute("y", 20);
  rect.setAttribute("width", 60);
  rect.setAttribute("height", 100);
  rect.setAttribute("fill", "#fff");
  rect.setAttribute("stroke", "#000");
  svg.appendChild(rect);

  const terminal1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  terminal1.setAttribute("x", Number(rect.getAttribute("x")) + -10);
  terminal1.setAttribute("y", Number(rect.getAttribute("y")) + 10);
  terminal1.setAttribute("width", 20);
  terminal1.setAttribute("height", 20);
  terminal1.setAttribute("fill", "#fff");
  terminal1.setAttribute("stroke", "#000");
  svg.appendChild(terminal1);

  const terminal2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  terminal2.setAttribute("x", Number(rect.getAttribute("x")) + -10);
  terminal2.setAttribute("y", Number(rect.getAttribute("y")) + 70);
  terminal2.setAttribute("width", 20);
  terminal2.setAttribute("height", 20);
  terminal2.setAttribute("fill", "#fff");
  terminal2.setAttribute("stroke", "#000");
  svg.appendChild(terminal2);

  const terminal3 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  terminal3.setAttribute("x", Number(rect.getAttribute("x")) + 50);
  terminal3.setAttribute("y", Number(rect.getAttribute("y")) + 40);
  terminal3.setAttribute("width", 20);
  terminal3.setAttribute("height", 20);
  terminal3.setAttribute("fill", "#fff");
  terminal3.setAttribute("stroke", "#000");
  svg.appendChild(terminal3);
}

function main() {
  const svg = document.querySelector("#svg");
  setCanvasSize(svg);
  drawGrid(svg);
  addBlock(svg);
  window.addEventListener("resize", () => {
    console.log("resized");
    setCanvasSize(svg);
  });
}

main();
