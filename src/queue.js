var Queue = Backbone.Model.extend({
  initialize: function() {
    this.localStorage = new Store('queues');
  },

  instantiate: function() {
    var namespace = this.get('class_name');
    namespace = namespace.split(/\./);

    var hash = window[namespace[0]];
    for(var i = 1; i < namespace.length; i++) {
      hash = hash[namespace[i]];
    }

    return new hash(this.get('options'));
  },

  run: function(options) {
    options = options || {};
    options.success = options.success || Queues.prototype.next;

    var self = this;

    var object = this.instantiate();
    object.run({
      success: function() {
        self.destroy();

        options.success();
      },
      error: options.error
    });
  }
});
