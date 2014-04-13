define(['jquery', 'underscore', 'backbone', 'text!templates/user/settings.html',
        'models/user', 'models/session', 'collections/users',
        'collections/sessions', 'routing/router', 'socket.io'],
  function($, _, Backbone, Template, User, Session, UsersCollection, SessionsCollection, Router, io) {

  var UserSettingsView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),
    events: {
      'keypress #edit-email': 'checkEmailInputForEnterKey',
      'keypress #confirm-new-password': 'checkPasswordInputForEnterKey',
      'click #update-account-button': 'updateUserSettings',
      'click #change-password-button': 'changePassword',
      'click #change-credit-card': 'addCreditCard',
    },

    initialize: function(options) {
      this.user = options.user;
      this.socket = io.connect('http://localhost');
      var self = this;
      this.socket.on('connect', function(){
        console.log('connected');
      });
      this.socket.on('updatedUser', function(model){
        console.log('woooo updated a user');
        console.log(self.user);
        if(model._id == self.user.get('_id')){
          console.log('updated a user');
          //the user has been updated
          self.user.fetch();
        }
      });

      this.listenTo(this.user, 'change', this.render);
      this.listenTo(this.user, 'destroy', this.remove);
    },

    render: function() {
      console.log('rendering settings');
      console.log(this.user);
      this.$el.html( this.template( this.user.toJSON() ) );
      return this;
    },

    updateUserSettings: function(){
      // Parse the data
      var firstName = this.$el.find('#edit-first-name').val();
      var lastName = this.$el.find('#edit-last-name').val();
      var dateOfBirth = this.$el.find('#edit-date-of-birth').val();
      var phone = this.$el.find('#edit-phone').val();
      var email = this.$el.find('#edit-email').val();
      if(firstName){
        this.user.set('firstName', firstName);
      }
      if(lastName){
        this.user.set('lastName', lastName);
      }
      if(dateOfBirth){
        this.user.set('birthdate', dateOfBirth);
      }
      if(phone){
        this.user.set('phone', phone);
      }
      if(email){
        this.user.set('email', email);
      }

      this.user.unset('password');
      //this.socket.on('connect', function(){
        //console.log('sending emit');
        this.socket.emit('updatingUser', this.user);
      //});
      this.user.save();
      Router.sharedInstance().navigate('/users/' + this.user.get('_id'), {trigger: true});

      return false;
    },

    changePassword: function(){
      var oldPassword = this.$el.find('#input-old-password').val();
      var newPassword = this.$el.find('#input-new-password').val();
      var confirmNewPassword = this.$el.find('#confirm-new-password').val();

      var passwordIsCorrect = false;
      var newPasswordsMatch = true;
      if(newPassword != confirmNewPassword){
        newPasswordsMatch = false;
        alert("New passwords don't match!");
      }

      // Check password on the server, save if it is correct
      if(oldPassword && newPassword && confirmNewPassword){
        var theModel = this.user;
        var session = new Session({email: this.user.get('email'), password: oldPassword});
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
          // Save if the new passwords match
          if(newPasswordsMatch){
            theModel.set('password', newPassword);
            theModel.save();
            Router.sharedInstance().navigate('/users/' + theModel.get('_id'), {trigger: true});
          }
        }});
      }
    },

    addCreditCard: function() {
      Router.sharedInstance().navigate('/users/settings/credit-card', {trigger: true});
    },

    checkEmailInputForEnterKey: function(evt){
      if(evt.keyCode == 13){
        this.updateUserSettings();
        return false;
      }
    },

    checkPasswordInputForEnterKey: function(evt){
      if(evt.keyCode == 13){
        this.changePassword();
        return false;
      }
    }
  });

  return UserSettingsView;
});
