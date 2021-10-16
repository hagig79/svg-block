const Block = function () {};

Block.prototype.hello = function () {
  console.log("hello");
};

Block.prototype = {
  hello: function () {
    console.log("hello2");
  },
};
