class Runner {
  run(worksheet) {
    console.log(worksheet);
    worksheet.blocks.forEach((block) => {
      block.evalute();
    });
  }
}

export { Runner };
