define([
  'jquery'
], function($) {
  // to: required. num in deg
  // speed: optional. number or string
  // easing: optional. string
  // callback: optional. function
  $.fn.rotateY = function(to, speed, easing, callback) {
    if(typeof(speed) === 'function') {
      callback = speed;
      speed = undefined;
    }
    if(typeof(easing) === 'function') {
      callback = easing;
      easing = undefined;
    }

    var that = this;
    return this.animate(
      { 'rotateY': to },
      {
        'duration': speed,
        'easing': easing,
        'step': function(now, fx) {
          that.css('-webkit-transform', 'rotateY('+now+'deg)');
        },
        'complete': callback
      }
    );
  }
});
