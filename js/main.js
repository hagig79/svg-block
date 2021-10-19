function main() {
  const svg = document.querySelector("#svg");

  const factory = new SvgFactory(svg);

  const worksheet = new WorkSheet(factory);
  worksheet.initialize();

  const button = document.querySelector("#add-button");
  button.addEventListener("click", () => {
    const block = new Block(factory);
    worksheet.addBlock(block);
  });
}

main();
