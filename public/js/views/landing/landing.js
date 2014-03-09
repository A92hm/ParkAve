define(['jquery', 'underscore', 'backbone', 'text!templates/landing/landing.html',
        'models/session', 'collections/sessions', 'routing/router', 'stellar'],
  function($, _, Backbone, Template, Session, SessionsCollection, Router, stellar) {

  var LandingView = Backbone.View.extend({
    tagName: 'div',
    className: 'landing-div',
    template: _.template( Template ),

    events: {
      'click #landing-get-started-button': 'openGetStartedPage',
      'click #landing-login-button': 'openLoginPage'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( this.template() );

      setTimeout(function(){
        $.stellar();
        $.stellar('refresh');
      }, 50);
      return this;
    },

    openGetStartedPage: function(){
      Router.sharedInstance().navigate('getstarted', {trigger: true});
      return false;
    },

    openLoginPage: function(){
      Router.sharedInstance().navigate('login', {trigger: true});
      return false;
    }
  });

  return LandingView;
});
