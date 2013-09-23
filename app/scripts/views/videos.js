/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'collections/videos',
  'views/video'
], function ($, _, Backbone, JST, VideosCollection, VideoView, view_queue) {
  'use strict';

  var VideosView = Backbone.View.extend({
    el: '#videos-wrapper',
    events: {
      'click a.start': 'start'
    },
    initialize: function() {
      this.subviews = [];

      this.autostart = false;

      this.collection = new VideosCollection();
      this.collection.on('add', this.add_video, this);
      this.collection.fetch();
    },
    template: JST['app/scripts/templates/videos-template.hbs'],
    render: function() {
      this.$el.append(this.template);
    },
    add_video: function(video) {
      var view = new VideoView({ model: video })
      this.subviews.push(view);
      
      this.$el.append(view.render());

      if(this.autostart && this.subviews.length >= this.collection.length) {
        this.loaded();
      }
    },
    start: function() {
      var i = 0;
      for(;i < this.subviews.length; i++) {
        var view = this.subviews[i];
        view.start();
      }
    },
    loaded: function() {
      this.start();
    }
  });

  return VideosView;
});
