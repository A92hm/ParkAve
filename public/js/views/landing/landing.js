define(['jquery', 'underscore', 'backbone', 'text!templates/landing/landing.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

  var LandingView = Backbone.View.extend({
    tagName: 'div',
    className: 'landing-view-div',
    template: _.template( Template ),

    events: {
      'keypress #get-started-email-input': 'checkEmailInputForEnterKey',
      'click #get-started-button': 'openGetStartedPage',
      'click #login-button': 'openLoginModal'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( this.template( ) );

      // Fixes login modal backdrop not fading away on back button press
      $('.modal-backdrop').remove();

      // Animate WOW text!
      this.$el.find( "#wow-text" ).css({
        "letter-spacing": "30px",
        "margin-left": "-1400px"
      });
      this.$el.find( "#wow-text" ).animate({
        "letter-spacing": "0px",
        "margin-left": "0px"
      }, 800 );

      // Animate the sign up box
      this.$el.find( "#get-started-form" ).css({
        "margin-left": "1400px",
        "margin-right": "-1400px"
      });
      this.$el.find( "#get-started-form" ).animate({
        "margin-left": "0px",
        "margin-right": "0px"
      }, 800 );

      // Animate WOW text!
      this.$el.find( "#desc-text-box-1" ).css({
        "margin-left": "2800px",
        "margin-right": "-2800px"
      });
      this.$el.find( "#desc-text-box-1" ).animate({
        "margin-left": "0px",
        "margin-right": "0px"
      }, 1600 );

      // Animate WOW text!
      this.$el.find( "#desc-text-box-2" ).css({
        "margin-left": "4200px",
        "margin-right": "-4200px"
      });
      this.$el.find( "#desc-text-box-2" ).animate({
        "margin-left": "0px",
        "margin-right": "0px"
      }, 2400 );

      // Animate WOW text!
      this.$el.find( "#desc-text-box-3" ).css({
        "margin-left": "5600px",
        "margin-right": "-5600px"
      });
      this.$el.find( "#desc-text-box-3" ).animate({
        "margin-left": "0px",
        "margin-right": "0px"
      }, 3200 );

      return this;
    },

    openGetStartedPage: function(){
      var email = this.$el.find('#get-started-email-input').val();
      if(email){
        Router.sharedInstance().navigate('getstarted/' + email, {trigger: true});
      }
      return false;
    },

    openLoginModal: function(){
      Router.sharedInstance().navigate('landing/login', {trigger: true});
      return false;
    },

    checkEmailInputForEnterKey: function(evt){
      if(evt.keyCode == 13){
        this.openGetStartedPage();
        return false;
      }
    }
  });

  return LandingView;
});