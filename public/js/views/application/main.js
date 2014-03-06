define(['jquery', 'underscore', 'backbone', 'text!templates/application/main.html',
        'models/user', 'models/lot', 'models/spot', 'collections/users', 'collections/lots', 'collections/spots',
        'collections/reviews', 'views/landing/landing', 'views/landing/getstarted', 'views/landing/login',
        'views/buyParking/buyParking', 'views/sellParking/sellParking',
        'views/lot/lot-list', 'views/lot/lot', 'views/spot/spot-list', 'views/spot/spot',
        'views/reviews/feedback-page', 'views/reviews/review-list', 'views/user/settings',
        'views/navigation/navigation'
        
        ], 
  function($, _, Backbone, Template, User, Lot, Spot, UsersCollection,
           LotsCollection, SpotsCollection, ReviewCollection, LandingView, GetStartedView,
           LoginView, BuyParkingView, SellParkingView, LotsListView, LotView, SpotsListView, SpotView,
           FeedbackView, ReviewList, UserSettingsView, NavigationView) {

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
      var getStartedModel = new Backbone.Model( {firstName: '', lastName: '', email: email} );
      var getStartedView = new GetStartedView( {model: getStartedModel} );
      this.$el.html( getStartedView.render().el );
    },

    showLogin: function(){
      alert('unimplemented');
    },

    showBuyParking: function(uid){
      var thisGuy = this;
      this.getCurrentUser(uid, function(user){
        var buyParkingView = new BuyParkingView( {model: user} );
        thisGuy.$el.html( buyParkingView.render().el );
        thisGuy.showNavigation(user);
      });
    },

    showSellParking: function(uid){
      var thisGuy = this;
      this.getCurrentUser(uid, function(user){
        var lots = new LotsCollection([], {user: user});
        var sellParkingView = new SellParkingView( {model: user, collection: lots} );
        thisGuy.$el.html( sellParkingView.render().el );
        lots.fetch();
        thisGuy.showNavigation(user);
      });
    },

    showLots: function(uid) {
      var thisGuy = this;
      this.getCurrentUser(uid, function(user){
        var lots = new LotsCollection([], {user: user});
        var lotsView = new LotsListView({collection: lots});
        thisGuy.$el.html(lotsView.render().el);
        lots.fetch();
        thisGuy.showNavigation(user);
      });
    },

    showLot: function(uid, lid) {
      var thisGuy = this;
      this.getCurrentUser(uid, function(user){
        var lot = new Lot({_id: lid});
        var lots = new LotsCollection([lot], {user: user});

        var lotView = new LotView({model: lot});
        thisGuy.$el.html( lotView.render().el );
        lot.fetch();
        thisGuy.showNavigation(user);
      });
    },

    showSpots: function(uid, lid) {
      var thisGuy = this;
      this.getCurrentUser(uid, function(user){
        var lot = new Lot({_id: lid});
        var lots = new LotsCollection([lot], {user: user});

        var spots = new SpotsCollection([], {lot: lot, user: user});

        var spotsView = new SpotsListView({collection: spots});
        thisGuy.$el.html( spotsView.render().el );
        spots.fetch();
        thisGuy.showNavigation(user);
      });
    },

    showSpot: function(uid, lid, sid) {
      var thisGuy = this;
      this.getCurrentUser(uid, function(user){
        var lot = new Lot({_id: lid});
        var lots = new LotsCollection([lot], {user: user});

        var spot = new Spot({_id: sid});
        var spots = new SpotsCollection([spot], {lot: lot});
        
        var spotView = new SpotView({model: spot});
        thisGuy.$el.html( spotView.el );
        spot.fetch();
        thisGuy.showNavigation(user);
      });
    },

    showUserFeedback: function(uid){
      var thisGuy = this;
      this.getCurrentUser(uid, function(user){
        var userFeedbackView = new FeedbackView({user: user});
        thisGuy.$el.html(userFeedbackView.render().el);
        thisGuy.showNavigation(user);
      });
    },
    showReviewList:  function(uid){
      var thisGuy = this;
      this.getCurrentUser(uid, function(user){
        var reviewCollection = new ReviewCollection([],{user: user});
        var userReviewList = new ReviewList({collection: reviewCollection, user: user});
        thisGuy.$el.html(userReviewList.render().el);
        reviewCollection.fetch();
        thisGuy.showNavigation(user);
      });
    },
    showUserSettings: function(uid){
      var thisGuy = this;
      this.getCurrentUser(uid, function(user){
        var userSettingsView = new UserSettingsView( {model: user} );
        thisGuy.$el.html( userSettingsView.render().el );
        thisGuy.showNavigation(user);
      });
    },

    showNavigation: function(user, refresh){
      if($('#main-navbar').length > 0 && !refresh){
        return;
      }

      if(!user){  // if there was no user given
        this.getCurrentUser(function(currUser){
          var navigationView = new NavigationView( {model: currUser} );
          $('#navbar').html( navigationView.render().el );
        })
      } else{  // if param is a user
        var navigationView = new NavigationView( {model: user} );
        $('#navbar').html( navigationView.render().el );
      }
    },

    getCurrentUser: function(uid, cb){
      var user = new User( {_id: uid});
      var usersCollection = new UsersCollection([user]);
      user.fetch({error: function(){
        console.log('err', err);
      }, success: function(model, res){
        cb(model);
      }});

      // with sessions
      // var session = new Session();
      // session.fetch({error: function(){
      //   console.log('err', err);
      // }, success: function(model, res){
      //   cb(model);
      // }});
    }
  });

  MainAppView.sharedInstance = _.once(function() {
    return new MainAppView();
  });

  return MainAppView;
});