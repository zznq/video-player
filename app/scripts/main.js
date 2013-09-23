/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        handlebars: {
          exports: 'Handlebars'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars',
        bootstrap: 'vendor/bootstrap'
    }
});

require([
  'backbone',
  'views/videos'
], function (Backbone, VideosView) {
    Backbone.history.start();

    Backbone.Model.prototype.slug = function(attribute) {
      var text = this.get(attribute);

      if(typeof(text) !== 'string')
        return '';

      return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^-\w]+/g, '')
        .replace(/--/g, '-');
    };
    
    var videos = new VideosView();
    videos.render();
});
