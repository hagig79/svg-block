import { WorkSheet } from "./WorkSheet.js";
import { WorkSheetView } from "./WorkSheetView.js";
import { PubSub } from "./PubSub.js";
import { ConstantBlock } from "./ConstantBlock.js";
import { OutputBlock } from "./OutputBlock.js";
import { AdditionBlock } from "./AdditionBlock.js";
import { Runner } from "./Runner.js";

function main() {
  const svg = document.querySelector("#svg");

  const pubsub = new PubSub();

  const worksheet = new WorkSheet();
  worksheet.setPubSub(pubsub);
  const workSheetView = new WorkSheetView(worksheet);
  workSheetView.mount(svg);
  workSheetView.setPubSub(pubsub);

  const button1 = document.querySelector("#add-button1");
  button1.addEventListener("click", () => {
    var block = new AdditionBlock();
    worksheet.addBlock(block);
  });

  const button2 = document.querySelector("#add-button2");
  button2.addEventListener("click", () => {
    var block = new ConstantBlock();
    worksheet.addBlock(block);
  });

  const button3 = document.querySelector("#add-button3");
  button3.addEventListener("click", () => {
    var block = new OutputBlock();
    worksheet.addBlock(block);
  });

  const runButton = document.querySelector("#run-button");
  runButton.addEventListener("click", () => {
    const runner = new Runner();
    runner.run(worksheet);
  });

  window.addEventListener("resize", () => {
    setCanvasSize(svg);
  });

  setCanvasSize(svg);
}

function setCanvasSize(svgElement) {
  const nav = document.querySelector("#nav");
  const width = Math.min(window.outerWidth, window.innerWidth);
  const height =
    Math.min(window.outerHeight, window.innerHeight) - nav.clientHeight;
  svgElement.setAttribute("width", width);
  svgElement.setAttribute("height", height);
  svgElement.setAttribute("viewBox", "0,0," + width + "," + height);
}

main();
