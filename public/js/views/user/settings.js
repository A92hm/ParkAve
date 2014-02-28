define(['jquery', 'underscore', 'backbone', 'text!templates/user/settings.html',
  'views/navigation/navigation', 'models/user', 'models/session', 'collections/users',
  'collections/sessions', 'routing/router'],
  function($, _, Backbone, Template, NavigationView, User, Session, UsersCollection, SessionsCollection, Router) {

  var UserSettingsView = Backbone.View.extend({
    tagName: 'div',
    className: 'user-settings-div',
    template: _.template( Template ),
    events: {
      'click #update-account-button': 'updateUserSettings'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      var navigationView = new NavigationView( {model: this.model} );
      this.$el.find('#navbar').html( navigationView.render().el );
      return this;
    },

    updateUserSettings: function(){
      // Parse the data
      var firstName = this.$el.find('#edit-first-name').val();
      var lastName = this.$el.find('#edit-last-name').val();
      var dateOfBirth = this.$el.find('#edit-date-of-birth').val();
      var phone = this.$el.find('#edit-phone').val();
      var email = this.$el.find('#edit-email').val();
      var oldPassword = this.$el.find('#input-old-password').val();
      var newPassword = this.$el.find('#input-new-password').val();
      var confirmNewPassword = this.$el.find('#confirm-new-password').val();
      if(firstName && lastName){
        this.model.set('name', firstName + ' ' + lastName);
      }
      if(dateOfBirth){
        this.model.set('birthdate', dateOfBirth);
      }
      if(phone){
        this.model.set('phone', phone);
      }
      if(email){
        this.model.set('email', email);
      }
      
      var passwordIsCorrect = false;
      var newPasswordsMatch = true;
      if(newPassword != confirmNewPassword){
        newPasswordsMatch = false;
        alert("New passwords don't match!");
      }

      // Check password on the server, save if it is correct
      if(oldPassword && newPassword && confirmNewPassword){
        var theModel = this.model;
        var session = new Session({email: this.model.get('email'), password: oldPassword});
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
      } else{
        this.model.unset('password');
        this.model.save();
        Router.sharedInstance().navigate('/users/' + this.model.get('_id'), {trigger: true});
      }

      return false;
    }
  });

  return UserSettingsView;
});
