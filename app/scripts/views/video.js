/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'helpers/queue',
  'helpers/css_hook',
  'handlebars',
  'helpers/rotateY'
], function ($, _, Backbone, JST, queue, cssHook) {
  'use strict';

  cssHook.create('rotateY');
  var speed = 1500;
  
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
      this._add_to_queue();
    },
    open: function(outer_next) {
      var that = this;

      this.$container.orig = {
        'z-index': 10000,
        'top': this.$container.offset().top,
        'left': this.$container.offset().left,
        'height': this.$container.height(),
        'width': this.$container.width()
      };

      var height = $(window).height();
      var width = $(window).width();

      this.$container
        .css(this.$container.orig)
        .animate(
          {
            'top': 0,
            'left': 0,
            'height': height,
            'width': width
          },
          {
            'duration': speed,
            'complete': function() {
              that.$container.css('overflow', 'hidden');
            }
          }
        ).css('overflow', 'visible');


      this.$card
        .rotateY(180, speed)
        .queue(function(next) {
          that.play(outer_next);
          next();
        });
    },
    close: function(next) {
      var that = this;
      this.$container
        .animate(
          this.$container.orig,
          {
            'duration': speed,
            'complete': function() {
              that.$container.css('z-index', null);
            }
          }
        );

      this.$card
        .rotateY(0, speed, next);
    },
    play: function(next) {
      var that = this;
      
      var $video = this.$container.find('video');

      $video.on('ended', function() {
        that.close(next);  
      });

      // take out when finished testing
      //setTimeout(function() { that.close(next); }, 1000);

      $video[0].play();
    },
    _add_to_queue: function() {
      queue.enqueue(this);
    }
  });

  return VideoView;
});
