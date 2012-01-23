var Mutex = function() {
  this.queues = [];
  this.locked = false;
};

Mutex.prototype = {
  run: function(callback) {
    var self = this;

    if (this.queues.length > 0 && !this.locked) {
      this.locked = true;

      var f = this.queues.pop();
      try {
        f(function() {
          self.next.call(self);
        });
      } catch(ex) {
        self.next.call(self);
      }
    }
  },

  next: function() {
    this.locked = false;
    this.run();
  },

  lock: function(callback) {
    this.queues.push(callback);
    this.run();
  }
};

