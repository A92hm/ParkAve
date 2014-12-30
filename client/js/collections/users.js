define(['underscore','backbone', 'models/user'], function(_, Backbone, User) {

  var UsersCollection = Backbone.Collection.extend({
    model: User,
    url: '/api/users',

    initialize: function() {
  	  var self = this;
    },

    clienturl: function() {
      return this.url.slice(4);
    }
  });

  return UsersCollection;
});
