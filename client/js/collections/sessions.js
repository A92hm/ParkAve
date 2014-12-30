define(['underscore','backbone', 'models/session'], function(_, Backbone, Session) {

  var SessionsCollection = Backbone.Collection.extend({
    model: Session,
    url: '/api/users/session'
  });

  return SessionsCollection;
});
