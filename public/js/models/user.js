define(['underscore','backbone'], function(_, Backbone) {

  var User = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
      name: '',
      email: '',
      password: '',
      birthdate: '',
      phone: ''
    },

    initialize: function() {
    },

    clienturl: function() {
      return this.url().slice(4);
    }
  });

  return User;
});