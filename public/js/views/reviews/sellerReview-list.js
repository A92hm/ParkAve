define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/review-list.html',
  'routing/router', 'views/reviews/sellerReview', 'collections/sellerReviews'],
  function($, _, Backbone, Template, Router, Review, SellerReviewCollection) {

  var ReviewList = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
    },

    initialize: function(options) {
      this.seller = options.seller;
      //create collection
      this.collection = new SellerReviewCollection([],{seller: this.seller});
      this.collection.fetch();

      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'add', this.addOne);
    },

    render: function() {
      this.$el.html( this.template( ) );
      this.$reviewList = this.$el.find('#review-list');
      this.addAll();
      /*
      for (var i = 0; i < (this.getAverage()); i++) {
        this.$el.find('#stars').append("<span class=\"glyphicon glyphicon-star\"></span>");
      };
      */
      return this;
    },
    addAll: function(){
      this.$reviewList.empty();
      this.collection.each(this.addOne, this);
      
    },
    addOne: function(sellerReview){
      //slowly add reviews

      var reviewView = new Review({model: sellerReview, seller: this.seller});
      var $review = reviewView.render().$el;
      this.$reviewList.delay(400).queue(function (next) {
        $(this).append($review.fadeIn(400));
        next();
      });
    },
    getAverage: function(){
      var total = 0;
      var count = 0;
      this.collection.each(function(review){
        count++;
        total = total + review.get("stars");
        console.log("strs"+ review.get("stars"));
      },this);
      console.log('total: '+total);
      return total/count;
    }
  });

  return ReviewList;
});
