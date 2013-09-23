define([
  'jquery',
  'underscore'
], function($, _) {
  var SENTINEL = 'inprogress';

  var Queue = function() {
    this.queue = [];
    this.current = null;
  };

  Queue.prototype = {
    enqueue: function(o) {
      this.queue.push(o);

      if(this.queue[0] !== SENTINEL) {
        this.dequeue();
      }
    },
    dequeue: function() {
      var obj = this.queue.shift();

      if(obj === SENTINEL) {
        obj = this.queue.shift();
      }

      if(obj) {
        this.queue.unshift(SENTINEL);

        this.current = obj;

        this.run();
      }
    },
    run: function() {
      _helpers.action.call(this, 'run', this.current);
    }
  };

  var _helpers = {
    action: function(name, queued) {
      if(typeof(queued[name]) === 'function') {
        queued[name]();
      }

      _helpers.trigger.call(this, name, queued);
    },
    trigger: function(name, obj) {
      var that = this,
          next = function() {
            that.dequeue();
          };
      obj.trigger('queue:' + name, next);
    }
  };

  // because requirejs only loads(and runs) this file once we don't need to worry about
  // returning a singleton
  return new Queue();
});
