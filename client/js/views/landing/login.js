define(['jquery', 'underscore', 'backbone', 'text!templates/landing/login.html',
  'routing/router', 'models/user', 'models/session', 'collections/users', 'collections/sessions'],
  function($, _, Backbone, Template, Router, User, Session, UsersCollection, SessionsCollection) {

  var LoginView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
      'keypress #input-login-password': 'checkPasswordInputForEnterKey',
      'click #input-login-button': 'login',
      'click #not-a-member' : 'signup'
    },

    initialize: function(options) {
      this.email = options.email;
    },

    render: function() {
      this.$el.html( this.template( {email: this.email} ) );
      this.$el.find('#login-modal').modal({show: true, backdrop: false});
      return this;
    },

    login: function(){
      var email = this.$el.find('#input-login-email').val();
      var password = this.$el.find('#input-login-password').val();

      var theLoginModal = this.$el.find('#login-modal');
      var session = new Session({email: email.toLowerCase(), password: password});
      var sessionsCollection = new SessionsCollection([session]);
      session.save({}, {error: function(err){
        console.log('err', err);
      }, success: function(model, response){
        if(!response._id){
          if(response.err == 'nomatch'){
            alert("Incorrect Password");
          }else if(response.err == 'notfound'){
            alert("Incorrect User Name");
          }
          return;
        }
        var user = new User(response);
        var usersCollection = new UsersCollection([user]);
        theLoginModal.modal('hide');
        Router.sharedInstance().navigate('sell', {trigger: true});
      }});

      return false;
    },

    checkPasswordInputForEnterKey: function(evt){
      if(evt.keyCode == 13){
        this.login();
        return false;
      }
    },

    signup: function(){
       Router.sharedInstance().navigate('getstarted', {trigger: true});
       return false;
    }
  });
  


  return LoginView;
});

