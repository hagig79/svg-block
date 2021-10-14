const Block = function () {};

Block.prototype.hello = function () {
  console.log("hello");
};

Block.prototype = {
  set x(x) {
    console.log("set x");
  },
  hello: function () {
    console.log("hello2");
  },
};
