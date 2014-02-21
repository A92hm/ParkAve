define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/feedback-page.html',
  'routing/router', 'views/reviews/sellerReview-list'],
  function($, _, Backbone, Template, Router, ReviewList) {

  	var UserFeedbackView = Backbone.View.extend({
	  tagName: 'div',
    template: _.template( Template ),

    events: {
    },

    initialize: function(options) {
      //this.seller = options.seller;
    },

    render: function() {
      this.$el.html( this.template() );
      this.$reviewBody = this.$el.find( '#review-body');
      var feedbackList = new ReviewList({seller: this.seller});
      this.$reviewBody.html( feedbackList.render().el );
      return this; 
    },


  	});
  	return UserFeedbackView;

  });
