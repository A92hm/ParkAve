define(['jquery', 'underscore', 'backbone', 'text!templates/landing/login.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

  var LoginView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
      'hide.bs.modal': 'modalHidden',
      'keypress #input-login-password': 'checkPasswordInputForEnterKey',
      'click #input-login-button': 'login'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( this.template( ) );
      this.$el.find('#login-modal').modal('show');
      return this;
    },

    modalHidden: function(){
      Router.sharedInstance().navigate('/landing', {trigger: false});
    },

    login: function(){
      var email = this.$el.find('#input-login-email').val();
      var password = this.$el.find('#input-login-password').val();
      //TODO encrypt password

      //TODO log the user in
      console.log("login");

      return false;
    },

    checkPasswordInputForEnterKey: function(evt){
      if(evt.keyCode == 13){
        this.login();
        return false;
      }
    }
  });

  return LoginView;
});

