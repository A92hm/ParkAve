define(['jquery', 'underscore', 'backbone', 'text!templates/landing/getstarted.html',
  'text!templates/widgets/inputerror.html', 'routing/router','models/user', 'collections/users'],
  function($, _, Backbone, Template, InputErrorTemplate, Router, User, UsersCollection) {

  var GetStartedView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
      'keypress #input-password': 'checkPasswordInputForEnterKey',
      'click #sign-up-button': 'signUp'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    },

    signUp: function(){
      // Parse the data
      var fullName = this.$el.find('#input-full-name').val();
      var firstName = fullName.split(' ')[0];
      var lastName = fullName.split(' ')[1];
      var dateOfBirth = this.$el.find('#input-date-of-birth').val();
      var phone = this.$el.find('#input-phone').val();
      var email = this.$el.find('#input-email').val();
      var password = this.$el.find('#input-password').val();

      // Validate the input
      var inputErrorTemplate = _.template( InputErrorTemplate );
      var valid = true;
      if(!firstName){
        this.$el.find('#input-full-name').prev().children('i').html( inputErrorTemplate() );
        valid = false;
      }else{
        this.$el.find('#input-full-name').prev().children('i').html( '' );
      }
      if(!dateOfBirth){
        this.$el.find('#input-date-of-birth').prev().children('i').html( inputErrorTemplate() );
        valid = false;
      }else{
        this.$el.find('#input-date-of-birth').prev().children('i').html( '' );
      }
      if(!phone){
        this.$el.find('#input-phone').prev().children('i').html( inputErrorTemplate() );
        valid = false;
      }else{
        this.$el.find('#input-phone').prev().children('i').html( '' );
      }
      if(!email){
        this.$el.find('#input-email').prev().children('i').html( inputErrorTemplate() );
        valid = false;
      }else{
        this.$el.find('#input-email').prev().children('i').html( '' );
      }
      if(!password){  //TODO further validation and encryption
        this.$el.find('#input-password').prev().children('i').html( inputErrorTemplate() );
        valid = false;
      }else{
        this.$el.find('#input-password').prev().children('i').html( '' );
      }

      if(!valid){
        console.log("signUp");
        return false;
      }

      // Make the user model and set their data
      var newUser = new User();
      var usersCollection = new UsersCollection([newUser]);

      newUser.set({
        firstName: firstName,
        lastName: lastName,
        birthdate: dateOfBirth,
        phone: phone,
        email: email,
        password: password
      });

      // Save the new user
      newUser.save({}, {error: function(err){
        console.log(err);
      }, success: function(model, response){
        if(!response.err){
          Router.sharedInstance().navigate(newUser.clienturl(), {trigger: true});
        }else if(response.err == 'emailexists'){
          alert('This email has already been used to create an account');
        }
      }});

      return false;
    },

    checkPasswordInputForEnterKey: function(evt){
      if(evt.keyCode == 13){
        this.signUp();
        return false;
      }
    }
  });

  return GetStartedView;
});
