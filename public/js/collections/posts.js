define(['underscore','backbone', 'models/post'], function(_, Backbone, Post) {

  var PostsCollection = Backbone.Collection.extend({
    model: Post,
    url: '/api/posts',

    clienturl: function() {
      return this.url.slice(4);
    }
  });

  return PostsCollection;
});