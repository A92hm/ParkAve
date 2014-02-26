
define(['jquery', 'underscore', 'backbone', 'text!templates/post/list.html',
  'views/post/post-list-item', 'views/post/post-list-new'],
  function($, _, Backbone, Template, PostListItemView, NewPostView) {

  var PostListView = Backbone.View.extend({
    tagName: 'div',
    className: 'post-list',
    template: _.template( Template ),

    events: {
      'click a[href="#newpost"]': 'createNewPost'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( this.template() );
      this.$posts = this.$el.find('#posts');
      return this;
    },

    addAll: function() {
      this.$posts.empty();
      this.collection.each(this.addOne, this);
    },

    addOne: function(post) {
      var postView = new PostListItemView({model: post});
      this.$posts.append( postView.render().el );
    },

    createNewPost: function(event) {
      this.newPostView = new NewPostView();
      this.newPostView.render().$el.modal(); // .modal() is bootstrap
      this.listenTo(this.newPostView, 'dialog:save', this.saveNewPost);
      return false;
    },

    saveNewPost: function(event) {
      this.collection.create(this.newPostView.postAttributes);
      // really we should have some error handling here

      // dismiss the dialog
      this.stopListening(this.newPostView); // stop listening to dialog:save
      this.newPostView.$el.modal('hide'); // from bootstrap
      delete this.newPostView; // delete reference
    }
  });

  return PostListView;

});