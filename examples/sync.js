
// Models
var Post = Backbone.Model.extend({
  initialize: function() {
    var self = this;

    this.localStorage = new Store('posts');

    this.bind('after_save', function() {
      var queues = new Queues();
      queues.fetch({
        success: function() {
          queues.create({
            class_name: 'Sync.Posts',
            options: {
              object_id: self.id
            }
          }, {
            success: function() {
              queues.trigger('sync');
            }
          });
        }
      });
    });
  }
});

// Collections
var Posts = Backbone.Collection.extend({
  model: Post,

  initialize: function() {
    this.localStorage = new Store('posts');
  }
});


// Views
var Views = {};

Views.New = Backbone.View.extend({
  events: {
    "form submit": "save"
  },

  tagName: 'div',

  render: function() {
  },

  save: function() {
    var self = this;

    this.model.save({}, {
      success: function() {
        self.model.trigger('after_save');
      }
    });
  }
});

// Routers

var Routers = {};

Routers.Posts = Backbone.Router.extend({
  routes: {
    '': 'new'
  },

  'new': function() {
    new Views.New({
      model: new Post()
    });
  }
});

// Syncs

var Sync = {};
Sync.Posts = function(options) {
  this.object_id = options.object_id;
};

Sync.Posts.prototype.run = function(options) {
  var post = new Post({ id: this.object_id });
  post.fetch({
    success: function() {
      // you can place here any async requests
      // it will work in queues
      $('#results').append('<p>post with id(' + post.id + ') was synced</p>');

      // now we don't need post in localstorage,
      // we have already synced this data.
      post.destroy();

      options.success();
    }
  });
};

var App = {};

App.start = function() {
  var controller = new Routers.Posts();

  var view1 = new Views.New({
    model: new Post()
  });
  view1.save();

  var view2 = new Views.New({
    model: new Post()
  });
  view2.save();

  var view3 = new Views.New({
    model: new Post()
  });
  view3.save();
};

$(function() {
  App.start();
});

