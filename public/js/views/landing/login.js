define(['jquery', 'underscore', 'backbone', 'text!templates/landing/login.html',
  'routing/router', 'collections/users'],
  function($, _, Backbone, Template, Router, UsersCollection) {

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

      var usersCollection = new UsersCollection();
      var theLoginModal = this.$el.find('#login-modal');
      usersCollection.fetch({error: function(err){
        console.log(err);
      }, success: function(collection, response){
        var user = collection.findWhere({email: email, password: password});
        if(!user){
          alert("Username/Password invalid");
          return;
        }
        usersCollection.add(user);
        theLoginModal.modal('hide');
        Router.sharedInstance().navigate(user.clienturl(), {trigger: true});
      }});

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

