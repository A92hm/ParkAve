define(['underscore','backbone', 'models/review'], function(_, Backbone, Review) {

  var ReviewsCollection = Backbone.Collection.extend({
    model: Review,
    url: function(){
    	return this.user.url()+'/reviews'
    },

    initialize: function(models, options){
    	//console.log("options", options);
    	this.user = options.user;
    },


    clienturl: function() {
      return this.url.slice(4);
    }
  });

  return ReviewsCollection;
});