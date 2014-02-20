define(['jquery', 'underscore', 'backbone', 'text!templates/application/main.html',
<<<<<<< HEAD
        'views/landing/landing', 'views/landing/getstarted', 'views/landing/login', 'models/lot',  'collections/lots',
         'views/lot/lot-list', 'views/lot/lot'
         ], 
  function($, _, Backbone, Template, LandingView, GetStartedView, LoginView, Lot, LotsCollection, 
          LotsListView, LotView) {
=======
        'views/landing/landing', 'views/landing/getstarted', 'views/landing/login', 
        'views/reviews/userFeedback', 'views/reviews/userReviews'
         ], 
  function($, _, Backbone, Template, LandingView, GetStartedView, LoginView, UserFeedbackView, UserReviewsView) {
>>>>>>> 55e6fb34dfe0dcb6871178b76fc58e815c3dac3f

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
      var getStartedModel = new Backbone.Model( {email: email} );
      var getStartedView = new GetStartedView( {model: getStartedModel} );
      this.$el.html( getStartedView.render().el );
    },

    showLogin: function(){
<<<<<<< HEAD
      //TODO
    },

    showLots: function() {
      var lots = new LotsCollection();
      var lotsView = new LotsListView({collection: lots})
      $('#content').html( lotsView.render().el );
      lots.fetch();
    },

    showLot: function(id) {
      var lot = new Lot({_id: id});
      var lots = new LotsCollection([lot]);
      
      var lotView = new LotView({model: lot});
      $('#content').html( lotView.el );
      lot.fetch();
=======
      var loginView = new LoginView();
      this.$el.append( loginView.render().el );

    },
    showUserFeedback: function(uid){
      var userFeedbackView = new UserFeedbackView();
      this.$el.html(userFeedbackView.render().el);
    },
    showUserReviews:  function(uid){
      console.log('show user reviews');
      var userReviewsView = new UserReviewsView();
      this.$el.html(userReviewsView.render().el);
>>>>>>> 55e6fb34dfe0dcb6871178b76fc58e815c3dac3f
    }
  });

  MainAppView.sharedInstance = _.once(function() {
    return new MainAppView();
  });

  return MainAppView;
});