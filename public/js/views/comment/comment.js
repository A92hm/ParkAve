var App = App || {};
App.View = App.View || {};

App.View.Comment = Backbone.View.extend({
  tagName: 'div',
  className: 'comment',
  template: _.template( $('#comment-template').html() ),

  events: {
    'click a[href="#comments"]': 'returnToComments'
  },

  initialize: function(options) {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.post = options.post
  },

  render: function() {
    this.$el.html( this.template( this.model.toJSON() ) );
    return this; 
  },

  returnToComments: function() {

    var comments = new App.Collection.Comments([], {post: this.post});
    App.router.navigate(comments.clienturl(), {trigger: true});
    return false;

    // where do i get the post from to pass back into the comments collection?
    // it has to come from the comment view, which instantiated this view,
    // but then the comments list has to have the post as well,
    // which comes from the post. we should have a better way to do this
    
    // I'd like to introspect the resource url (comments) from the individual url (comments/x)
    // substringin would be possible, but is a hack. we need a solution

    // And again, the following code has been moved to App.View.main#showComments

    /*
    var commentsView = new App.View.CommentList.Comments({collection: comments, post: this.post});
    $('#content').html( commentsView.render().el );
    comments.fetch();
    return false;
    */
  }
});