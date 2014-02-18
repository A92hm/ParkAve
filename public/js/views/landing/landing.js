define(['jquery', 'underscore', 'backbone', 'text!templates/landing/landing.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

  var LandingView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
      'keypress #get-started-email-input': function(evt){
        if(evt.keyCode == 13){
          this.openGetStartedPage();
          return false;
        }
      },
      'click #get-started-button': 'openGetStartedPage',
      'click #login-button': 'openLoginModal'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( this.template( ) );

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
      //TODO
      return false;
    }
  });

  return LandingView;
});