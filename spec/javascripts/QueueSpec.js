describe('Queue', function() {
  beforeEach(function() {
    localStorage.removeItem('queues');

    this.queue = new Queue();
  });

  it("should be saveable to localstorage", function() {
    var self = this;

    this.queue.save({ type: 'Test' }, function() {
      var q = new Queue({ id: self.queue.id });
      q.fetch({
        success: function() {
          expect(q.get('type')).toBe('Test');
        }
      });
    });
  });

  describe('has already existed in queues', function() {
    beforeEach(function() {
      var self = this;

      this.queue.save({
        class_name: 'Test.Class',
      }, {
        success: function() {
          self.queue.run();
        }
      });
    });

    it("should be possible to run queue with properly params", function() {
      var object = new Test.Class(this.options);

      spyOn(object, 'run');
      spyOn(this.queue, 'instantiate').andReturn(object);

      this.queue.run();

      expect(object.run).wasCalled();

      var collection = new Queues();
      collection.fetch({
        success: function() {
          expect(collection.models.length).toBe(0);
        }
      });
    });
  });

  it("should be possible to run with params of runnable class", function() {
    var self = this;
    this.queue.save({
      class_name: 'Test.Class',
      options: {
        param1: 'param1',
        param2: 'param2'
      }
    }, {
      success: function() {
        self.queue.run(function() {
          expect(this instanceof Test.Class).toBeTruthy();
          expect(this.value.param1).toBe('param1');
          expect(this.value.param2).toBe('param2');
        });
      }
    });
  });
});
