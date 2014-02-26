define(['jquery', 'underscore', 'backbone', 'text!templates/comment/listitem.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

  var CommentListItem = Backbone.View.extend({
    tagName: 'div',
    className: 'comment',
    template: _.template( Template ),

    events: {
      'click a[href="#delete"]': 'deleteComment',
      'click a[href="#view"]': 'viewComment'
    },

    initialize: function(options) {
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'add', this.addOne);
      this.post = options.post;
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this; 
    },

    deleteComment: function() {
      this.model.destroy({wait: true})
        .done(function(data) {
          // good to go
        })
        .fail(function(xhr, data) {
          console.log('there was a problem deleting the model');
        });
      return false; 
    },

    viewComment: function() {
      Router.sharedInstance().navigate(this.model.clienturl(), {trigger: true});
      return false;
    }
  });

  return CommentListItem;
});