define(['underscore','backbone'], function(_, Backbone) {

  var Session = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
      email: '',
      password: ''
    },

    initialize: function() {
    }
  });

  return Session;
});