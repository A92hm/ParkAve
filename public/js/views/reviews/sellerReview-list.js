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
      console.log('render list');
      this.$el.html( this.template( ) );
      this.$reviewList = this.$el.find('#review-list');
      this.addAll();
      return this;
    },
    addAll: function(){
      console.log('add reviews');
      this.$reviewList.empty();
       console.log(this.collection);
      this.collection.each(this.addOne, this);
    },

    addOne: function(review){
      console.log("add a review");
      var reviewView = new Review({model: review, seller: this.seller});
      this.$reviewList.append( reviewView.render().el );
    }

  });

  return ReviewList;
});
