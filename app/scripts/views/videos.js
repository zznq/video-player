/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'collections/videos',
  'views/video'
], function ($, _, Backbone, JST, VideosCollection, VideoView) {
  'use strict';

  var VideosView = Backbone.View.extend({
    el: '#videos-wrapper',
    initialize: function() {
      this.collection = new VideosCollection();
      this.collection.on('add', this.append_video, this);
      this.collection.fetch();
    },
    template: JST['app/scripts/templates/videos-template.hbs'],
    render: function() {
      this.$el.html(this.template);
    },
    append_video: function(video) {
      this.$el.append(new VideoView({ model: video }).render());
    }
  });

  return VideosView;
});
