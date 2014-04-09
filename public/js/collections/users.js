define(['underscore','backbone', 'models/user'], function(_, Backbone, User) {

  var UsersCollection = Backbone.Collection.extend({
    model: User,
    url: '/api/users',
    backend: 'mybackend', //for the websockets

    initialize: function() {
  	 var self = this;
     /*
      this.bind('backend:create', function(model) {
          self.add(model);
      });
      this.bind('backend:update', function(model) {
      	console.log('user updated socket');
        self.get(model._id).set(model);
      });
      this.bind('backend:delete', function(model) {
          self.remove(model._id);
      });

    */
    },

    clienturl: function() {
      return this.url.slice(4);
    }
  });

  return UsersCollection;
});
