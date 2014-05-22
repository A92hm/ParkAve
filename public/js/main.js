require.config({
  paths: {
    "jquery": "/jquery/dist/jquery",
    "stellar": "/jquery.stellar/jquery.stellar",
    "bootstrap": "/bootstrap/dist/js/bootstrap.min",
    "underscore": "/underscore/underscore",
    "backbone": "/backbone/backbone",
    "modernizr": "/modernizr/modernizr",
    "text": "/requirejs-text/text",
    // "socket.io" : "./../socket.io/socket.io"
  },
  shim: {
    'bootstrap': ['jquery'],
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'socket.io': {
      exports: 'io'
    },
  }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'modernizr', 
         'routing/router', 'views/application/main'], 
  function($, Bootstrap, _, Backbone, Modernizr, Router, MainAppView) {
    
   // var io = Backbone.io.connect();
   // console.log(Backbone.io);
   // io.on('connect', function(model){
   //   console.log('connected');
      MainAppView.sharedInstance().render();  
      Router.sharedInstance().start();
      //console.log(io);
      // //sockets
      // var socket = io.connect('http://localhost');
      // socket.on('connect', function (data) {
      //   socket.emit('message', { message: 'there is a god' });
      // });
      /*
      socket.on('userUpdated', function(data){
        console.log('woooo updated a user');
        console.log(data);
      });
*/

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