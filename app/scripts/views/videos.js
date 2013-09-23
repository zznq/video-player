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
    initialize: function() {
      this.collection = new VideosCollection();
      this.collection.on('add', this.add_video, this);
      this.collection.fetch();
    },
    template: JST['app/scripts/templates/videos-template.hbs'],
    render: function() {
      this.$el.html(this.template);
    },
    add_video: function(video) {
      var view = new VideoView({ model: video });
      
      this.$el.append(view.render());
    }
  });

  return VideosView;
});
