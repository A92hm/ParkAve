define(['jquery', 'underscore', 'backbone', 'text!templates/application/main.html',
        'models/user', 'models/lot', 'models/spot', 'collections/users', 'collections/lots', 'collections/spots',
        'collections/reviews', 'views/landing/landing', 'views/landing/getstarted', 'views/landing/login',
        'views/buyParking/buyParking', 'views/sellParking/sellParking',
        'views/lot/lotList', 'views/lot/lot', 'views/spot/spotList', 'views/spot/spot',
        'views/reviews/feedback-page', 'views/reviews/review-list', 'views/user/settings',
        'views/navigation/navigation', 'models/session', 'collections/sessions', 'views/feedback/feedback',
        'routing/router','views/payment/payment', 'views/imageUploader/uploaderview'
        
        ], 
  function($, _, Backbone, Template, User, Lot, Spot, UsersCollection,
           LotsCollection, SpotsCollection, ReviewCollection, LandingView, GetStartedView,
           LoginView, BuyParkingView, SellParkingView, LotsListView, LotView, SpotsListView, SpotView,
           UserfeedBackView, ReviewList, UserSettingsView, NavigationView, Session,
           SessionsCollection, FeedbacksView, Router, PaymentView, ImageUploaderView) {

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
      require(['stellar'], function(stellar) {
        $.stellar();
        $.stellar('refresh');
      });
    },

    showFeedback: function() {
      var feedbackView = new FeedbacksView();
      this.$el.html( feedbackView.render().el );
    },

    showGetStarted: function(email){
      var getStartedView = new GetStartedView( {email: email} );
      this.$el.html( getStartedView.render().el );
    },

    showLogin: function(email){
      var loginView = new LoginView( {email: email} );
      this.$el.html( loginView.render().el );
    },

    showBuyParking: function(){
      var thisGuy = this;
      this.getCurrentUser(function(user, rightUser){
        //redirect if wrong user
        if(!rightUser){
          //check if the user has been logged out
          if(user.id == null){
            Router.sharedInstance().navigate('landing' ,{trigger: true, replace:true});
            return;
          }
          Router.sharedInstance().navigate('buy' ,{trigger: true, replace:true});
          return;
        }
        var buyParkingView = new BuyParkingView( {user: user} );
        thisGuy.$el.html( buyParkingView.render().el );
        thisGuy.showNavigation(user);
      });
    },

    showSellParking: function(){
      var thisGuy = this;
      this.getCurrentUser(function(user, rightUser){
        //redirect if wrong user
        if(!rightUser){
          //check if the user has been logged out
          if(user.id == null){
            Router.sharedInstance().navigate('landing' ,{trigger: true, replace:true});
            return;
          }

          Router.sharedInstance().navigate('users' ,{trigger: true, replace:true});
          return;
        }
        var lots = new LotsCollection([], {user: user});
        lots.fetch({success: function(theLots){
          var sellParkingView = new SellParkingView( {user: user, collection: theLots} );
          thisGuy.$el.html( sellParkingView.render().el );
          thisGuy.showNavigation(user);
        }, error: function(collection, res, options){
          console.log('err: ');
          console.log();
        }});
      });
    },

    showLots: function() {
      var thisGuy = this;
      this.getCurrentUser(function(user, rightUser){
        var lots = new LotsCollection([], {user: user});
        var lotsView = new LotsListView({collection: lots});
        thisGuy.$el.html(lotsView.render().el);
        lots.fetch();
        thisGuy.showNavigation(user);
      });
    },

    showLot: function(lid) {
      var thisGuy = this;
      this.getCurrentUser(function(user, rightUser){
        var lot = new Lot({_id: lid});
        var lots = new LotsCollection([lot], {user: user});

        var lotView = new LotView({model: lot});
        thisGuy.$el.html( lotView.render().el );
        lot.fetch();
        thisGuy.showNavigation(user);
      });
    },

    showSpots: function(lid) {
      var thisGuy = this;
      this.getCurrentUser(function(user, rightUser){
        var lot = new Lot({_id: lid});
        var lots = new LotsCollection([lot], {user: user});

        var spots = new SpotsCollection([], {lot: lot, user: user});

        var spotsView = new SpotsListView({collection: spots});
        thisGuy.$el.html( spotsView.render().el );
        spots.fetch();
        thisGuy.showNavigation(user);
      });
    },

    showSpot: function(lid, sid) {
      var thisGuy = this;
      this.getCurrentUser(function(user, rightUser){
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

    showUserFeedback: function(){
      var thisGuy = this;
      this.getCurrentUser(function(user, rightUser){
        //redirect if wrong user
        if(!rightUser){
          //check if the user has been logged out
          if(user.id == null){
            Router.sharedInstance().navigate('landing' ,{trigger: true, replace:true});
            return;
          }
          Router.sharedInstance().navigate('users/'+user.id+'/feedback' ,{trigger: true, replace:true});
          return;
        }
        var userUserfeedBackView = new UserfeedBackView({user: user});
        thisGuy.$el.html(userUserfeedBackView.render().el);
        thisGuy.showNavigation(user);
      });
    },
    showReviewList:  function(){
      var thisGuy = this;
      this.getCurrentUser(function(user, rightUser){
        //redirect if wrong user
        if(!rightUser){
          //check if the user has been logged out
          if(user.id == null){
            Router.sharedInstance().navigate('landing' ,{trigger: true, replace:true});
            return;
          }
          Router.sharedInstance().navigate('users/'+user.id ,{trigger: true, replace:true});
          return;
        }
        var reviewCollection = new ReviewCollection([],{user: user});
        var userReviewList = new ReviewList({collection: reviewCollection, user: user});
        thisGuy.$el.html(userReviewList.render().el);
        reviewCollection.fetch();
        thisGuy.showNavigation(user);
      });
    },
    showUserSettings: function(){
      var thisGuy = this;
      this.getCurrentUser(function(user, rightUser){
        //redirect if wrong user
        if(!rightUser){
          //check if the user has been logged out
          if(user.id == null){
            Router.sharedInstance().navigate('landing' ,{trigger: true, replace:true});
            return;
          }
          Router.sharedInstance().navigate('users/'+user.id+'/settings' ,{trigger: true, replace:true});
          return;
        }
        var userSettingsView = new UserSettingsView( {user: user} );
        thisGuy.$el.html( userSettingsView.render().el );
        thisGuy.showNavigation(user);
      });
    },

    showAddCard: function() {
      var thisGuy = this;
      this.getCurrentUser(function(user, rightUser){
        //redirect if wrong user
        if(!rightUser){
          //check if the user has been logged out
          if(user.id == null){
            Router.sharedInstance().navigate('landing' ,{trigger: true, replace:true});
            return;
          }
          Router.sharedInstance().navigate('users' + user.id + '/settings/credit-card' ,{trigger: true, replace:true});
          return;
        }
        var addCardView = new PaymentView( {user: user} );
        thisGuy.$el.html( addCardView.render().el );
        thisGuy.showNavigation(user);
      });
    },

    showNavigation: function(user, refresh){
      if($('#main-navbar').length > 0 && !refresh){
        return;
      }

      if(!user){  // if there was no user given
        this.getCurrentUser(function(currUser, rightUser){
          var navigationView = new NavigationView( {model: currUser} );
          $('#navbar').html( navigationView.render().el );
        });
      } else{  // if param is a user
        var navigationView = new NavigationView( {model: user} );
        $('#navbar').html( navigationView.render().el );
      }
    },

    getCurrentUser: function(cb){
      //with sessions
      var session = new Session();
      var sessionCollection = new SessionsCollection([session]);
      var rightUser = true;
      session.fetch({error: function(model, res, options){
        console.log('err: ', res);
      }, success: function(model, res){
        console.log('confirmed that it is the right user: ');
        console.log(model.url());
        //take 'session' out of the url
        var newURL = model.url();
        newURL = newURL.substring(0,11) + newURL.substring(19,newURL.length);
        model.url = function(){return newURL;};//change the url to take out session
        cb(model, rightUser);
      }});
    },

    showImageUploader: function() {
      var imageUploaderView = new ImageUploaderView();
      this.$el.html( imageUploaderView.render().el);
    }

  });

  MainAppView.sharedInstance = _.once(function() {
    return new MainAppView();
  });

  return MainAppView;
});