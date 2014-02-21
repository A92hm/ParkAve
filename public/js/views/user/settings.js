define(['jquery', 'underscore', 'backbone', 
  'text!templates/user/settings.html',
  'views/navigation/navigation',
  'routing/router'],
  function($, _, Backbone, Template, NavigationView, Router) {

  var UserSettingsView = Backbone.View.extend({
    tagName: 'div',
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
      var passwordError = false;
      if(this.model.get('password') == oldPassword && newPassword && newPassword == confirmNewPassword){
        this.model.set('password', newPassword);
      }else if(oldPassword && this.model.get('password') != oldPassword){
        passwordError = true;
        alert('Incorrect password');
      }else if(newPassword != confirmNewPassword){
        passwordError = true;
        alert("New passwords don't match!");
      }
      if(!passwordError){
        this.model.save();
        Router.sharedInstance().navigate('/users/' + this.model.get('_id'), {trigger: true});
      }

      return false;
    }
  });

  return UserSettingsView;
});
