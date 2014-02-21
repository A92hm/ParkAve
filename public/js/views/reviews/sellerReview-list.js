define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/review-list.html',
  'routing/router', 'views/reviews/sellerReview'],
  function($, _, Backbone, Template, Router, Review) {

  var ReviewList = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
    },

    initialize: function(options) {
      this.seller = options.seller;
    },

    render: function() {
      this.$el.html( this.template( ) );
      this.$reviewList = this.$el.find('#review-list');
      return this;
    },
    addAll: function(){
      this.$reviewList.empty();
      this.collection.each(this.addOne, this);
    },

    addOne: function(review){
      var review = new Review({model: review, post: this.seller});
      this.$reviewList.append( review.render().el );
    }

  });

  return ReviewList;
});
