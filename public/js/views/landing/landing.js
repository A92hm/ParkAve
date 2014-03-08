define(['jquery', 'underscore', 'backbone', 'stellar', 'text!templates/landing/landing.html',
        'models/session', 'collections/sessions', 'routing/router'],
  function($, _, Backbone, stellar, Template, Session, SessionsCollection, Router) {

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
