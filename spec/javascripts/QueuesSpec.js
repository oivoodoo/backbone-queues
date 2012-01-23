describe('Queues', function() {
  beforeEach(function() {
    localStorage.removeItem('queues');

    this.queues = new Queues();
    this.options = {
      param1: 'param1'
    };

    this.queues.create({
      type: 'Test.Class',
      options: this.options
    });
  });

  it("should be saveable to local storage", function() {
    expect(localStorage['queues']).toBeDefined();
  });

  it("should have ability to fetch collection from local storage", function() {
    var queues = new Queues();
    queues.fetch({
      success: function() {
        expect(queues.models.length).toBe(1);
      }
    });
  });

  it("should be possible to run sync for queues", function() {
    var queue = this.queues.first();
    spyOn(queue, 'run');

    this.queues.trigger('sync');

    expect(queue.run).wasCalled();
  });

  it("should have only one and same instance for mutex", function() {
    var queues1 = new Queues();
    var queues2 = new Queues();

    expect(queues1.mutex instanceof Mutex).toBeTruthy();
    expect(queues2.mutex instanceof Mutex).toBeTruthy();
    expect(queues1.mutex == queues2.mutex).toBeTruthy();
  });

});

