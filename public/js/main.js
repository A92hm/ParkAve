require.config({
  paths: {
    "jquery": "/jquery/dist/jquery",
    "stellar": "/jquery.stellar/jquery.stellar",
    "bootstrap": "/bootstrap/dist/js/bootstrap.min",
    "underscore": "/underscore/underscore",
    "backbone": "/backbone/backbone",
    "modernizr": "/modernizr/modernizr",
    "text": "/requirejs-text/text"
  },
  shim: {
    'bootstrap': ['jquery'],
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    }
  }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'modernizr', 
         'routing/router', 'views/application/main', 'backbone.io'], 
  function($, Bootstrap, _, Backbone, Modernizr, Router, MainAppView, backboneio) {
  //backboneio.connect();
  MainAppView.sharedInstance().render();  
  Router.sharedInstance().start();

  // ensure csrf token is included in ajax requests
  // we haven't talked about this

  /*
  $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    var token;
    if (!options.crossDomain) {
      token = $('meta[name="csrf-token"]').attr('content');
      if (token) {
        return jqXHR.setRequestHeader('X-CSRF-Token', token);
      }
    }
  });
  */


});