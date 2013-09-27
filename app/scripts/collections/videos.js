/*global define*/

define([
  'underscore',
  'backbone',
  'models/video'
], function (_, Backbone, VideoModel) {
  'use strict';

  var VideosCollection = Backbone.Collection.extend({
    model: VideoModel,
    url: 'data/videos.json'
  });

  return VideosCollection;
});
