define(['underscore','backbone', 'models/sellerReview'], function(_, Backbone, SellerReview) {

  var SellerReviewsCollection = Backbone.Collection.extend({
    model: SellerReview,
    url: function(){
    	return this.seller.url()+'/reviews'
    },

    initialize: function(models, options){
    	//console.log("options", options);
    	this.seller = options.seller;
    },


    clienturl: function() {
      return this.url.slice(4);
    }
  });

  return SellerReviewsCollection;
});