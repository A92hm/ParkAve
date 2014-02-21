
define(['underscore', 'require', 'backbone'], 
  function(_, require, Backbone, MainAppView) {

  var Router = Backbone.Router.extend({
    routes: {
      'landing': 'landing',
      'landing/login': 'login',
      'getstarted': 'getStarted',
      'getstarted/:email': 'getStarted',

      'login': 'login',
      'createlot': 'createLot',
      'lots':      'lots',
      'lots/:id':  'lot',
      'lots/:pid/spots':      'spots',
      'lots/:pid/spots/:cid':      'spot',
      
      'users': '',
      'users/:uid': 'userPage',
      'users/:uid/feedback' : 'userFeedback',
      'users/:uid/reviews' : 'userReviews',

      '': 'main'
    },

    main: function() {
      this.navigate('landing', {trigger: true});
    },

    lots: function() {
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showLots();
      });

      // we can require the main view dynamically when needed. if not we encouter a circularity:
      // router -> main -> lot list -> lot list item -> router
    }, 

    lot: function(id) {
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showLot(id);
      });
    },

    spots: function() {
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showSpots();
      });

      // we can require the main view dynamically when needed. if not we encouter a circularity:
      // router -> main -> lot list -> lot list item -> router
    }, 

    spot: function(id) {
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showSpot(id);
      });
    },

    landing: function(){
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showLanding();
      });
    },

    getStarted: function(email){
      require(['views/application/main'], function(MainAppView){
        MainAppView.sharedInstance().showGetStarted(email);
      });
    },

    login: function(){
      require(['views/application/main'], function(MainAppView){
        MainAppView.sharedInstance().showLogin();
      });
    },

    userPage: function(uid){
      require(['views/application/main'], function(MainAppView){
        MainAppView.sharedInstance().showUserPage(uid);
      })
    },

    userFeedback: function(uid) {
      require(['views/application/main'], function(MainAppView){
        MainAppView.sharedInstance().showUserFeedback(uid);
      });
    },
    userReviews : function(uid){
      require(['views/application/main'], function(MainAppView){
        MainAppView.sharedInstance().showUserReviews(uid);
      });
    },

    createLot: function(email) {
      require(['views/application/main'], function(MainAppView){
        MainAppView.sharedInstance().showCreateLot(email);
      });
    },

    // call start when the application is ready to begin routing
    start: function() {
      var router = this;

      // Set up browser history
      Backbone.history.start({ pushState: true });

      // Router fix so that internal links do not all have to begin with hashes
      // Or rather so that the browser doesn't always refersh the page

      $(document).on("click", "a[href^='/']", function(evt) {
        var href = $(this).attr('href');
        var protocol = this.protocol + '//';

        if (href.slice(protocol.length) !== protocol) {
          evt.preventDefault();
          router.navigate(href, true);
        }
      });
    }
  });

  Router.sharedInstance = _.once(function() {
    return new Router();
  });

  return Router;
});
