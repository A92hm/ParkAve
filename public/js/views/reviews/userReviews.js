define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/userReviews.html',
  'routing/router', 'views/reviews/review'],
  function($, _, Backbone, Template, Router) {

  var UserReviewsView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( this.template( ) );
      return this;
    },

  });

  return UserReviewsView;
});
