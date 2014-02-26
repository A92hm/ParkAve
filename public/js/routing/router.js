
define(['underscore', 'require', 'backbone'], 
  function(_, require, Backbone, MainAppView) {

  var Router = Backbone.Router.extend({
    routes: {
      'landing': 'landing',
      'landing/login': 'login',
      'getstarted': 'getStarted',
      'getstarted/:email': 'getStarted',

      'login': 'login',
      'users/:uid/lots':      'lots',
      'users/:uid/lots/:lid':  'lot',
      
      'users': '',

      'users/:uid': 'userPage',
      'users/:uid/feedback' : 'userFeedback',
      'users/:uid/reviews' : 'userReviews',
      'users/:uid/settings' : 'userSettings',
      'users/:uid/lots/:lid/spots' : 'spots',
      'users/:uid/lots/:lid/spots/:sid':      'spot',

      '': 'main'
    },

    main: function() {
      this.navigate('landing', {trigger: true});
    },

    lots: function(uid) {
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showLots(uid);
      });

      // we can require the main view dynamically when needed. if not we encouter a circularity:
      // router -> main -> lot list -> lot list item -> router
    }, 

    lot: function(uid, lid) {
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showLot(uid, lid);
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
        console.log("userReviews");
        MainAppView.sharedInstance().showReviewList(uid);
      });
    },
    
    userSettings: function(uid){
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showUserSettings(uid);
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
