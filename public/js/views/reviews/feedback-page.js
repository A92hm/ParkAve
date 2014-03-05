define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/feedback-page.html',
  'routing/router', 'views/reviews/review-list'],
  function($, _, Backbone, Template, Router, ReviewList) {

  	var UserFeedbackView = Backbone.View.extend({
	  tagName: 'div',
    template: _.template( Template ),

    events: {
      'click #submit-button' : 'submitClick',
      'click a[href="#sortdate"]' : 'sortDate',
      'click a[href="#sortlength"]' : 'sortLength',
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
      //console.log('test');
      //this.input = $('#filter-input').val();
      //console.log(this.input);
      var input = " ";
      this.feedbackList.filter($('#filter-input').val());
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
