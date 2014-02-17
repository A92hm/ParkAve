define(['jquery', 'underscore', 'backbone', 'text!templates/application/main.html',
         'models/post', 'models/comment', 'collections/posts', 'collections/comments',
         'views/post/post-list', 'views/post/post', 'views/comment/comment-list'
         ], 
  function($, _, Backbone, Template, Post, Comment, PostsCollection, CommentsCollection, 
          PostsListView, PostView, ComentsListView) {

  var MainAppView = Backbone.View.extend({
    el: '#content',
    template: _.template( Template ),

    render: function() {
      this.$el.html( this.template() );
      return this; 
    },

    showPosts: function() {
      var posts = new PostsCollection();
      var postsView = new PostsListView({collection: posts})
      $('#content').html( postsView.render().el );
      posts.fetch();
    },

    showPost: function(id) {
      var post = new Post({_id: id});
      var posts = new PostsCollection([post]);
      
      var postView = new PostView({model: post});
      $('#content').html( postView.el );
      post.fetch();
    },

    showComments: function(pid) {
      // to derive the post api url, we use a posts collection
      var post = new Post({_id: pid});
      var posts = new PostsCollection([post]);

      //to derive the comments api url, we use a comments collection
      var comments = new CommentsCollection([], {post: post});

      // and then the usual call to start the view
      var commentsView = new ComentsListView({collection: comments, post: post});
      $('#content').html( commentsView.render().el );
      comments.fetch();

      // you know what would be nice? helpers for determine the url for a post or comment
      // like ruby on rails
    },

    showComment: function(pid, cid) {

      // to derive the post api url, we use a posts collection
      var post = new App.Model.Post({_id: pid});
      var posts = new App.Collection.Posts([post]);

      //to derive the comments api url, we use a comments collection
      var comment = new App.Model.Comment({_id: cid});
      var comments = new App.Collection.Comments([comment], {post: post});

      var commentView = new App.View.Comment({model: comment, post: post});
      $('#content').html( commentView.el );
      comment.fetch();
    }

  });

  MainAppView.sharedInstance = _.once(function() {
    return new MainAppView();
  });

  return MainAppView;
});