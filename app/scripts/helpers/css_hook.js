define([
  'jquery'
], function($) {
  var CssHook = function() {
    this.create = function(name) {
      $.cssHooks[name] = {
        get: function(elem, computed, extra) {
          return $(elem).data(name);
        },
        set: function(elem, value) {
          $(elem).data(name, value);
        }
      }

      // prevent jquery from appending px to values
      $.cssNumber[name] = true;

      $.fx.step[name] = function(fx) {
        $.cssHooks[name].set(fx.elem, fx.now + fx.unit);
      }
    };
  }

  return new CssHook();
});
