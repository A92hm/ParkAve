
define(['jquery', 'underscore', 'backbone', 'text!templates/comment/list.html',
  'routing/router', 'views/comment/comment-list-item'],
  function($, _, Backbone, Template, Router, CommentListItemView) {

  var CommentsListView = Backbone.View.extend({
    tagName: 'div',
    className: 'comment-list',
    template: _.template( Template ),

    events: {
      'click a[href="#newcomment"]': 'createNewComment',
      'click a[href="#backtopost"]' : 'returnToPost'
    },

    initialize: function(options) {
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'add', this.addOne);
      this.post = options.post;
    },

    render: function() {
      this.$el.html( this.template() );
      this.$comments = this.$el.find('#comments');
      return this;
    },

    addAll: function() {
      this.$comments.empty();
      this.collection.each(this.addOne, this);
    },

    addOne: function(comment) {
      // we have to pass the post in to this view: see comments.js:24
      var postView = new CommentListItemView({model: comment, post: this.post});
      this.$comments.append( postView.render().el );
    },

    returnToPost: function(event) {
      Router.sharedInstance().navigate(this.post.clienturl(), {trigger: true});
      return false;
    },

    createNewComment: function(event) {
      console.log('unimplemented');
      return false;
    },

    saveNewComment: function(event) {
      console.log('unimplemented');
    }
  });

  return CommentsListView;
});