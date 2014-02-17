define(['underscore','backbone'], function(_, Backbone) {

  var Comment = Backbone.Model.extend({
    idAttribute: '_id',

    clienturl: function() {
      return this.url().slice(4);
    }
  });

  return Comment;
});