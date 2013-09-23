/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'helpers/queue',
  'helpers/css_hook',
  'handlebars',
  'helpers/rotateY',
  'easing'
], function ($, _, Backbone, JST, queue, cssHook) {
  'use strict';

  cssHook.create('rotateY');
  var speed = 1500;
  var easing = 'easeOutExpo';
  
  var VideoView = Backbone.View.extend({
    el: '#videos',
    initialize: function() {
      this.on('queue:run', this.open, this);
    },
    template: JST['app/scripts/templates/video-template.hbs'],
    render: function() {
      var model = this.model.toJSON();
      model['slugs'] = { name: this.model.slug('name') };

      this.$el.append(this.template(model));

      this.$container = this.$('.' + this.model.slug('name') + '.video');
      this.$card = this.$container.find('.card');

      this.$container.initial_values = {
        'z-index': 0,
        'top': this.$container.position().top + parseInt(this.$container.css('margin-top')),
        'left': this.$container.position().left + parseInt(this.$container.css('margin-left')),
        'height': this.$container.height(),
        'width': this.$container.width()
      };
    },
    start: function() {
      var that = this;
      var css = $.extend(
          {}, 
          {'position':'absolute', 'margin': '0'}, 
          this.$container.initial_values
        );
      this.$container.css(css);

      this._add_to_queue();
    },
    open: function(outer_next) {
      var that = this;

      var height = $(window).height();
      var width = $(window).width();

      this.$container
        .css('z-index', 1000)
        .animate(
          {
            'top': this.$container.position().top - this.$container.offset().top,
            'left': 0,
            'height': height,
            'width': width
          },
          {
            'duration': speed,
            'easing': easing,
            'complete': function() {
              that.$container.css('overflow', 'hidden');
            }
          }
        ).css('overflow', 'visible');


      this.$card
        .rotateY(180, speed, easing)
        .queue(function(next) {
          that.play(outer_next);
          next();
        });
    },
    close: function(next) {
      var that = this;
      this.$container
        .animate(
          this.$container.initial_values,
          {
            'duration': speed,
            'easing': easing,
            'complete': function() {
              that.$container.css('z-index', '');
            }
          }
        ).css('overflow', 'visible');

      this.$card
        .rotateY(0, speed, easing, next);
    },
    play: function(next) {
      var that = this;
      
      var $video = this.$container.find('video');

      $video.on('ended', function() {
        that.close(next);  
      });

      $video[0].play();
    },
    _add_to_queue: function() {
      queue.enqueue(this);
    }
  });

  return VideoView;
});
