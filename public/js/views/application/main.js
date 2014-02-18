define(['jquery', 'underscore', 'backbone', 'text!templates/application/main.html',
        'views/landing/landing', 'views/landing/getstarted', 'views/landing/login'
         ], 
  function($, _, Backbone, Template, LandingView, GetStartedView, LoginView) {

  var MainAppView = Backbone.View.extend({
    el: '#content',
    template: _.template( Template ),

    render: function() {
      this.$el.html( this.template() );
      return this;
    },

    showLanding: function() {
      var landingView = new LandingView();
      this.$el.html( landingView.render().el );
    },

    showGetStarted: function(email){
      var getStartedView = new GetStartedView();
      this.$el.html( getStartedView.render().el );
    },

    showLogin: function(){
      //TODO
    }
  });

  MainAppView.sharedInstance = _.once(function() {
    return new MainAppView();
  });

  return MainAppView;
});