define(['jquery', 'underscore', 'backbone', 'text!templates/application/main.html',
        'views/landing/landing', 'views/landing/getstarted', 'views/landing/login', 
        'views/reviews/feedback-page', 'views/reviews/review-list'
         ], 
  function($, _, Backbone, Template, LandingView, GetStartedView, LoginView, FeedbackView, ReviewList) {

  var MainAppView = Backbone.View.extend({
    el: '#content',
    template: _.template( Template ),

    render: function() {
      this.$el.html( this.template() );
      return this;
    },

    showLanding: function() {
      var landingView = new LandingView();
      this.$el.html( landingView.render().el );
    },

    showGetStarted: function(email){
      var getStartedView = new GetStartedView();
      this.$el.html( getStartedView.render().el );
    },

    showLogin: function(){
      //TODO
    },
    showUserFeedback: function(uid){
      var userFeedbackView = new FeedbackView();
      this.$el.html(userFeedbackView.render().el);
    },
    showUserReviews:  function(uid){
      console.log('show user reviews');
      var lotsReviewList = new ReviewList();
      this.$el.html(lotsReviewList.render().el);
    }
  });

  MainAppView.sharedInstance = _.once(function() {
    return new MainAppView();
  });

  return MainAppView;
});