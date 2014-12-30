define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/feedback-page.html',
  'routing/router', 'views/reviews/review-list'],
  function($, _, Backbone, Template, Router, ReviewList) {

  	var UserFeedbackView = Backbone.View.extend({
	  tagName: 'div',
    template: _.template( Template ),

    events: {
      'click #submit-button' : 'submitClick',
      'click a[href="#sortdate"]' : 'sortDate',
      'click a[href="#sortstars"]' : 'sortStars',
    },

    initialize: function(options) {
      this.user = options.user;
      this.feedbackList = new ReviewList({collection: this.collection,user: this.user});
      //this.listenTo(this.collection, 'reset', this.renderReviews);
      //this.listenTo(this.collection, 'add', this.renderReviews);
    },

    render: function() {
      this.$el.html( this.template() );
      this.renderReviews();
      return this; 
    },
    renderReviews: function() {
       this.$reviewBody = this.$el.find( '#review-body');
      this.$reviewBody.html( this.feedbackList.render().el );
    },
    submitClick: function(){
      var input = $('#filter-input').val();
      if(input == "") 
        input = " ";
      this.feedbackList.filter(input);
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
    test: function(){
      console.log('test');
      //this.input = $('#filter-input').val();
      console.log(this.input);
      //this.feedbackList.filter(this.$el.find('#filter-input').val());
     // this.submitClick();
      return false;
    }


  	});
  	return UserFeedbackView;

  });
