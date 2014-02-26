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

      return this;
    },

    submitEmail: function(){
      var email = this.$el.find('#email-input').val();

      //TODO check database for email key. Branch out accordingly to either login or get started
      if(confirm('Press OK to Login. Press Cancel to Sign Up.')){
        this.openLoginModal(email);        
      } else{
        this.openGetStartedPage(email);
      }
    },

    openGetStartedPage: function(email){
      if(email){
        Router.sharedInstance().navigate('getstarted/' + email, {trigger: true});
      }
      return false;
    },

    openLoginModal: function(email){
      var emailModel = new Backbone.Model( {email: email} );
      console.log(emailModel.get('email'));
      var loginView = new LoginView( {model: emailModel} );
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