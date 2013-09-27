/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var VideoModel = Backbone.Model.extend({
        defaults: {
          codec: 'video/webm'
        }
    });

    return VideoModel;
});
