define(['underscore','backbone', 'models/comment'], function(_, Backbone, Comment) {

  var CommentsCollection = Backbone.Collection.extend({
    model: Comment,
    url: function() {
      return this.post.url() + '/comments';
    },

    initialize: function(models, options) {
      this.post = options.post;
    },

    clienturl: function() {
      return this.url().slice(4);
    }
  });

  return CommentsCollection;
});