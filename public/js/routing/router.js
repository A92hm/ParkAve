define(['underscore', 'require', 'backbone'], 
  function(_, require, Backbone, MainAppView) {

  var Router = Backbone.Router.extend({
    routes: {
      'landing': 'landing',

      'feedback': 'feedback', 

      'buy/:uid': 'buyParking',
      'sell/:uid': 'sellParking',

      'getstarted': 'getStarted',
      'getstarted/:email': 'getStarted',
      'login': 'login',
      'login/:email': 'login',

      'users': '',
      'users/:uid': 'sellParking',
      'users/:uid/feedback': 'userFeedback',
      'users/:uid/settings': 'userSettings',

      '': 'main'
    },

    main: function() {
      this.navigate('landing', {trigger: true});
    },

    landing: function(){
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showLanding();
      });
    },

    feedback: function() {
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showFeedback();
      });
    },

    buyParking: function(uid){
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showBuyParking(uid);
      });
    },

    sellParking: function(uid){
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showSellParking(uid);
      });
    },

    getStarted: function(email){
      require(['views/application/main'], function(MainAppView){
        MainAppView.sharedInstance().showGetStarted(email);
      });
    },

    login: function(email){
      require(['views/application/main'], function(MainAppView){
        MainAppView.sharedInstance().showLogin(email);
      });
    },
    
    userFeedback: function(uid) {
      require(['views/application/main'], function(MainAppView){
        MainAppView.sharedInstance().showUserFeedback(uid);
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
