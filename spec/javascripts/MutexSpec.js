describe("Mutex", function() {
  beforeEach(function() {
    this.mutex = new Mutex();
    this.values = [];
  });

  it("should be locked if entered function doesn't finish their execution by running this.mutex callback", function() {
    this.mutex.lock(function(callback) {});

    expect(this.mutex.locked).toBeTruthy();
  });

  it("should be unlocked if entered function finish their execution", function() {
    this.mutex.lock(function(callback) {
      callback();
    });

    expect(this.mutex.locked).toBeFalsy();
  });

  it("should be unlocked on exception", function() {
    this.mutex.lock(function(callback) {
      throw "Any method exception";
    });

    expect(this.mutex.locked).toBeFalsy();
  });

  it("should run the next locked method", function() {
    var self = this;

    this.mutex.lock(function(callback) {
      throw "Any method exception";
    });

    this.mutex.lock(function(callback) {
      self.values.push('Runner 2');
      callback();
    });

    expect(this.mutex.locked).toBeFalsy();
    expect(this.values).toEqual(['Runner 2']);
  });

  it("should lock multiple runners while working", function() {
    var self = this;

    this.mutex.lock(function(callback) {
      self.values.push('Runner 1');

      callback();
    });

    this.mutex.lock(function(callback) {
      self.values.push('Runner 2');
      callback();
    });

    this.mutex.lock(function(callback) {
      self.values.push('Runner 3');
      callback();
    });

    this.mutex.lock(function(callback) {
      self.values.push('Runner 4');
      callback();
    });

    expect(this.mutex.locked).toBeFalsy();
    expect(this.values).toEqual(['Runner 1', 'Runner 2', 'Runner 3', 'Runner 4']);
  });
});
