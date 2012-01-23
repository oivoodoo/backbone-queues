Backbone Queues
===============

About
------

The main purpose of this library to run elements queues for sync data in your
client side application.

    var queues = new Queues();
    queues.fetch({
      success: function() {
        queues.trigger('sync');
      }
    });

Add new object to queue with predefined params:

    var queues = new Queues();
    queues.fetch();

    queues.create({
      class_name: 'ModuleName.ClassName',
      options: {
        param1: 'value1',
        param2: 'value2'
      }
    });

ModuleName.ClassName should have right implementation for running queue:

    var ModuleName = {};
    ModuleName.ClassName = function(options) {
    };

    ModuleName.ClassName.prototype.run(options) {
      // options contains success / error callbacks
      // when you completed to work in run method for example
      // on ajax success request you should run options.success()

      $.ajax({
        ...

        success: function() {
          options.success();
        }
      });
    };

If your queue completed successfully queue will be removed from
localStorage.

Dependency
----------

Backbone.localStorage - https://github.com/jeromegn/Backbone.localStorage

Underscore - https://github.com/documentcloud/underscore/

Backbone - https://github.com/documentcloud/backbone

jQuery - http://jquery.com

BUILD
-----

    bundle exec jammit

Then you can get minified version of backbone-queues from public/assets folder.

Examples
--------

Please see 'sync' example in examples folder.

