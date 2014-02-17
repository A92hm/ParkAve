
define(['jquery', 'underscore', 'backbone', 'text!templates/post/listitem.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

  var PostListItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'post',
    template: _.template( Template ),

    events: {
      'click a[href="#delete"]': 'deletePost',
      'click a[href="#view"]': 'viewPost'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this; 
    },

    deletePost: function() {
      this.model.destroy({wait: true})
        .done(function(data) {
          // good to go
        })
        .fail(function(xhr, data) {
          console.log('there was a problem deleting the model');
        });
      return false; 
    },

    viewPost: function() {
      Router.sharedInstance().navigate(this.model.clienturl(), {trigger: true});
      return false;
    }
  });

  return PostListItemView;

});