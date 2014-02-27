define(['jquery', 'underscore', 'backbone', 'text!templates/application/main.html',
        'models/user', 'models/lot', 'models/spot', 'collections/users', 'collections/lots', 'collections/spots',
        'views/landing/landing', 'views/landing/getstarted', 'views/landing/login',
        'views/lot/lot-list', 'views/lot/lot', 'views/spot/spot-list', 'views/spot/spot', 'views/user/home',
        'views/reviews/feedback-page', 'views/reviews/review-list', 'views/user/settings',
        'collections/reviews'
        ], 
  function($, _, Backbone, Template, User, Lot, Spot, UsersCollection, LotsCollection, SpotsCollection, LandingView, GetStartedView, LoginView, 
          LotsListView, LotView, SpotsListView, SpotView, UserPageView, FeedbackView, ReviewList, UserSettingsView, ReviewCollection) {

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
      if(this.$el.find('.landing-view-div').length == 0){
        var landingView = new LandingView();
        this.$el.html( landingView.render().el );
      }

      var loginView = new LoginView();
      this.$el.append( loginView.render().el );
    },

    showLots: function(uid) {
      var tempUser = new User( {_id: uid});
      var usersCollection = new UsersCollection([tempUser]);
      var lots = new LotsCollection([], {user: tempUser});

      var lotsView = new LotsListView({collection: lots})
      $('#content').html( lotsView.render().el );
      lots.fetch();
    },

    showLot: function(uid, lid) {
      var tempUser = new User( {_id: uid});
      var usersCollection = new UsersCollection([tempUser]);

      var lot = new Lot({_id: lid});
      var lots = new LotsCollection([lot], {user: tempUser});

      var lotView = new LotView({model: lot});
      $('#content').html( lotView.el );
      lot.fetch();
      console.log('showing lot');
    },

    showSpots: function(uid, lid) {
      var tempUser = new User( {_id: uid});
      var usersCollection = new UsersCollection([tempUser]);

      var lot = new Lot({_id: lid});
      var lots = new LotsCollection([lot], {user: tempUser});

      var lotView = new LotView({model: lot});


      var tempUser = new User( {_id: uid});
      var usersCollection = new UsersCollection([tempUser]);

      var spots = new SpotsCollection([], {lot: lot});
      var spotsView = new SpotsListView({collection: spots})
      $('#content').html( spotsView.render().el );
      spots.fetch();
    },

    showSpot: function(uid, lid, sid) {
      var spot = new Spot({_id: id});
      var spots = new SpotsCollection([spot]);
      
      var spotView = new SpotView({model: spot});
      $('#content').html( spotView.el );
      spot.fetch();
    },

    showUserPage: function(uid){
      var user = new User( {_id: uid});
      var usersCollection = new UsersCollection([user]);

      var userPageView = new UserPageView( {model: user} );
      this.$el.html( userPageView.el );
      user.fetch();
    },

    showUserFeedback: function(uid){
      var theUser = new User( {_id: uid});
      var usersCollection = new UsersCollection([theUser]);
      var userFeedbackView = new FeedbackView({user: theUser});
      this.$el.html(userFeedbackView.render().el);
    },
    showReviewList:  function(uid){
      var theUser = new User( {_id: uid});
      var usersCollection = new UsersCollection([theUser]);
      var reviewCollection = new ReviewCollection([],{user: theUser});
      console.log(reviewCollection);
      var userReviewList = new ReviewList({collection: reviewCollection, user: theUser});
      this.$el.html(userReviewList.render().el);
      reviewCollection.fetch();
    },
    showUserSettings: function(uid){
      var user = new User( {_id: uid});
      var usersCollection = new UsersCollection([user]);

      var userSettingsView = new UserSettingsView( {model: user} );
      this.$el.html( userSettingsView.el );
      user.fetch();
    }
  });

  MainAppView.sharedInstance = _.once(function() {
    return new MainAppView();
  });

  return MainAppView;
});