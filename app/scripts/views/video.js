/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'handlebars'
], function ($, _, Backbone, JST) {
  'use strict';

  var VideoView = Backbone.View.extend({
    el: '#videos',
    template: JST['app/scripts/templates/video-template.hbs'],
    render: function() {
      this.$el.append(this.template(this.model.toJSON()));
    }
  });

  return VideoView;
});
