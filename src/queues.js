var Queues = Backbone.Collection.extend({
  model: Queue,

  initialize: function() {
    this.localStorage = new Store('queues');
    this.mutex = Queues.mutex;

    var self = this;

    this.bind('sync', function() {
      self.each(function(queue) {
        queue.run(self.next);
      });
    });
  },

  next: function() {
    Queues.mutex.next.call(Queues.mutex);
  }
});

Queues.mutex = new Mutex();
