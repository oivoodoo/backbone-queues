beforeEach(function() {
  window.Test = {};
  Test.Class = function(options) {
    this.value = 'init';

    this.options = options || {};
  };
  Test.Class.prototype.run = function(options) {
    this.value = this.options;

    if (options.success) {
      options.success.call(this);
    }
  };
});
