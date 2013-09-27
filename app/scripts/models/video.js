/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var VideoModel = Backbone.Model.extend({
        defaults: {
          codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        }
    });

    return VideoModel;
});
