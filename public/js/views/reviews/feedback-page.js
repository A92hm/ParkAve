define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/feedback-page.html',
  'routing/router', 'views/reviews/sellerReview-list', 'views/navigation/navigation'],
  function($, _, Backbone, Template, Router, ReviewList, NavBar) {

  	var UserFeedbackView = Backbone.View.extend({
	  tagName: 'div',
    template: _.template( Template ),

    events: {
      'click #submit-button' : 'submitClick',
      'click a[href="#sortdate"]' : 'sortDate',
      'click a[href="#sortlength"]' : 'sortLength',
      'click a[href="#sortstars"]' : 'sortStars'
    },

    initialize: function(options) {
      this.seller = options.seller;
      this.feedbackList = new ReviewList({collection: this.collection,seller: this.seller});
      this.nav = new NavBar({model: this.seller});
      //this.listenTo(this.collection, 'reset', this.renderReviews);
      //this.listenTo(this.collection, 'add', this.renderReviews);
    },

    render: function() {
      this.$el.html( this.template() );
      this.$el.find("#feedback-nav").html( this.nav.render().el );
      this.renderReviews();
      return this; 
    },
    renderReviews: function() {
       this.$reviewBody = this.$el.find( '#review-body');
      this.$reviewBody.html( this.feedbackList.render().el );
    },
    submitClick: function(){
      console.log("submit clicked");

      return false;
    },
    sortDate: function(){
      this.feedbackList.sortDate();
      return false;
    },
    sortStars: function(){
      this.feedbackList.sortStars();
      return false;
    },
    sortLength: function(){
      console.log("sort length clicked");
      this.collection.comparator = 'body';
      this.collection.sort({});
      return false;
    }


  	});
  	return UserFeedbackView;

  });
