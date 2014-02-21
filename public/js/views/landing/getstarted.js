define(['jquery', 'underscore', 'backbone', 'text!templates/landing/getstarted.html',
  'text!templates/widgets/inputerror.html', 'routing/router','models/user', 'collections/users', 'views/navigation/navigation'],
  function($, _, Backbone, Template, InputErrorTemplate, Router, User, UsersCollection, NavigationView) {

  var GetStartedView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
      'click #sign-up-button': 'signUp'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      var navigationView = new NavigationView( {model: this.model} );
      this.$el.find('#navbar').html( navigationView.render().el );
      return this;
    },

    signUp: function(){
      // Parse the data
      var firstName = this.$el.find('#input-first-name').val();
      var lastName = this.$el.find('#input-last-name').val();
      var dateOfBirth = this.$el.find('#input-date-of-birth').val();
      var phone = this.$el.find('#input-phone').val();
      var email = this.$el.find('#input-email').val();
      var password = this.$el.find('#input-password').val();

      // Validate the input
      var inputErrorTemplate = _.template( InputErrorTemplate );
      var valid = true;
      if(!firstName){
        this.$el.find('#input-first-name').prev().children('i').html( inputErrorTemplate() );
        valid = false;
      }else{
        this.$el.find('#input-first-name').prev().children('i').html( '' );
      }
      if(!lastName){
        this.$el.find('#input-last-name').prev().children('i').html( inputErrorTemplate() );
        valid = false;
      }else{
        this.$el.find('#input-last-name').prev().children('i').html( '' );
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
        return false;
      }

      // Make the user model and set their data
      var newUser = new User();
      var usersCollection = new UsersCollection();
      usersCollection.add(newUser);

      newUser.set({
        name: firstName + ' ' + lastName,
        birthdate: dateOfBirth,
        phone: phone,
        email: email,
        password: password
      });

      // Save the new user
      newUser.save({}, {error: function(err){
        console.log(err);
      }, success: function(model, response){
        Router.sharedInstance().navigate(newUser.clienturl(), {trigger: true});
      }});

      return false;
    }
  });

  return GetStartedView;
});
