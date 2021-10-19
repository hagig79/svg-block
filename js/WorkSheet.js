const WorkSheet = function (factory) {
  this.view = factory.createWorkSheetView();
  this.blocks = [];
  // this.view.addEventListener("block-select", (e) => {
  //   console.log(e.detail.block);
  // });
};

WorkSheet.prototype.initialize = function () {
  this.view.initialize();
};

WorkSheet.prototype.addBlock = function (block) {
  this.blocks.push(block);
  this.view.addBlock(block);
};
