function main() {
  const svg = document.querySelector("#svg");

  const svgView = new SvgView(svg);
  const workspace = new WorkSheet(svgView);
  workspace.initialize();

  // const block = new Block();
  // block.x = "test";
  // block.hello();

  // workspace.addBlock(block);

  const button = document.querySelector("#add-button");
  button.addEventListener("click", () => {
    const block = new Block();
    workspace.addBlock(block);
  });
}

main();
