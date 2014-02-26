define(['jquery', 'underscore', 'backbone', 'text!templates/landing/landing.html',
        'views/navigation/navigation', 'views/landing/login', 'routing/router'],
  function($, _, Backbone, Template, NavigationView, LoginView, Router) {

  var LandingView = Backbone.View.extend({
    tagName: 'div',
    className: 'landing-body-div',
    template: _.template( Template ),

    events: {
      'keypress #email-input': 'checkEmailInputForEnterKey',
      'click #submit-email-button': 'submitEmail'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( this.template( ) );
      var navigationView = new NavigationView();
      //this.$el.find('#navbar').html( navigationView.render().el );

      // Fixes login modal backdrop not fading away on back button press
      $('.modal-backdrop').remove();

      return this;
    },

    submitEmail: function(){
      var email = this.$el.find('#get-started-email-input').val();
      //TODO check database for email key
      this.openLoginModal(email);
    },

    openGetStartedPage: function(email){
      if(email){
        Router.sharedInstance().navigate('getstarted/' + email, {trigger: true});
      }
      return false;
    },

    openLoginModal: function(email){
      var loginView = new LoginView( {email: email} );
      this.$el.append( loginView.render().el );
      return false;
    },

    checkEmailInputForEnterKey: function(evt){
      if(evt.keyCode == 13){
        this.submitEmail();
        return false;
      }
    }
  });

  return LandingView;
});