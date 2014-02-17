
define(['jquery', 'underscore', 'backbone', 'text!templates/post/post.html',
  'routing/router', 'collections/posts', 'collections/comments'],
  function($, _, Backbone, Template, Router, PostsCollection, CommentsCollection) {


  var PostView = Backbone.View.extend({
    tagName: 'div',
    className: 'post',
    template: _.template( Template ),

    events: {
      'click a[href="#comments"]': 'showComments',
      'click a[href="#delete"]': 'deletePost',
      'click a[href="#posts"]': 'returnToPosts'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this; 
    },

    returnToPosts: function() {
      var posts = new PostsCollection();
      Router.sharedInstance().navigate(posts.clienturl(), {trigger: true});
      return false;
    },

    showComments: function() {
      var comments = new CommentsCollection([], {post: this.model});
      Router.sharedInstance().navigate(comments.clienturl(), {trigger: true});
      return false;  
    },

    deletePost: function() {
      this.model.destroy({wait: true})
        .done(function(data) {
          { // pop back to posts. this is annoying
            var posts = new PostsCollection();
            Router.sharedInstance().navigate(posts.clienturl(), {trigger: true});
          }
        })
        .fail(function(xhr, data) {
          console.log('there was a problem deleting the model');
        });
      return false;
    }
  });

  return PostView;
});