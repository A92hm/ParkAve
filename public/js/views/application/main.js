define(['jquery', 'underscore', 'backbone', 'text!templates/application/main.html',
        'models/user', 'models/lot', 'models/spot', 'collections/users', 'collections/lots', 'collections/spots',
        'collections/reviews', 'views/landing/landing', 'views/landing/getstarted', 'views/landing/login',
        'views/buyParking/buyParking', 'views/sellParking/sellParking',
        'views/lot/lotList', 'views/lot/lot', 'views/spot/spotList', 'views/spot/spot',
        'views/reviews/feedback-page', 'views/reviews/review-list', 'views/user/settings',
        'views/navigation/navigation', 'models/session', 'collections/sessions', 'views/feedback/feedback',
        'routing/router', 'models/s3Model', 'collections/s3Collection' ,'views/imageUploader/uploaderview'
        
        ], 
  function($, _, Backbone, Template, User, Lot, Spot, UsersCollection,
           LotsCollection, SpotsCollection, ReviewCollection, LandingView, GetStartedView,
           LoginView, BuyParkingView, SellParkingView, LotsListView, LotView, SpotsListView, SpotView,
           UserfeedBackView, ReviewList, UserSettingsView, NavigationView, Session, 
           SessionsCollection, FeedbacksView, router, S3Model, S3Collection, ImageUploaderView) {

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

    showBuyParking: function(uid){
      var thisGuy = this;
      this.getCurrentUser(uid, function(user, rightUser){
        //redirect if wrong user
        if(!rightUser){
          //check if the user has been logged out
          if(user.id == null){
            router.sharedInstance().navigate('landing' ,{trigger: true, replace:true});
            return;
          }
          router.sharedInstance().navigate('buy/'+user.id ,{trigger: true, replace:true});
          return;
        }
        var buyParkingView = new BuyParkingView( {user: user} );
        thisGuy.$el.html( buyParkingView.render().el );
        thisGuy.showNavigation(user);
      });
    },

    showSellParking: function(uid){
      var thisGuy = this;
      console.log('show sell parking');
      this.getCurrentUser(uid, function(user, rightUser){
        //redirect if wrong user
        if(!rightUser){
          //check if the user has been logged out
          if(user.id == null){
            router.sharedInstance().navigate('landing' ,{trigger: true, replace:true});
            return;
          }

          router.sharedInstance().navigate('users/'+user.id ,{trigger: true, replace:true});
          return;
        }
        console.log('got the current user');
        var lots = new LotsCollection([], {user: user});
        lots.fetch({success: function(theLots){
          console.log('fetching lots');
          var sellParkingView = new SellParkingView( {user: user, collection: theLots} );
          thisGuy.$el.html( sellParkingView.render().el );
          thisGuy.showNavigation(user);
        }, error: function(collection, res, options){
          console.log('err: ');
          console.log();
        }});
      });
    },

    showLots: function(uid) {
      var thisGuy = this;
      this.getCurrentUser(uid, function(user, rightUser){
        var lots = new LotsCollection([], {user: user});
        var lotsView = new LotsListView({collection: lots});
        thisGuy.$el.html(lotsView.render().el);
        lots.fetch();
        thisGuy.showNavigation(user);
      });
    },

    showLot: function(uid, lid) {
      var thisGuy = this;
      this.getCurrentUser(uid, function(user, rightUser){
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
      this.getCurrentUser(uid, function(user, rightUser){
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
      this.getCurrentUser(uid, function(user, rightUser){
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
      this.getCurrentUser(uid, function(user, rightUser){
        //redirect if wrong user
        if(!rightUser){
          //check if the user has been logged out
          if(user.id == null){
            router.sharedInstance().navigate('landing' ,{trigger: true, replace:true});
            return;
          }
          router.sharedInstance().navigate('users/'+user.id+'/feedback' ,{trigger: true, replace:true});
          return;
        }
        var userUserfeedBackView = new UserfeedBackView({user: user});
        thisGuy.$el.html(userUserfeedBackView.render().el);
        thisGuy.showNavigation(user);
      });
    },
    showReviewList:  function(uid){
      var thisGuy = this;
      this.getCurrentUser(uid, function(user, rightUser){
        //redirect if wrong user
        if(!rightUser){
          //check if the user has been logged out
          if(user.id == null){
            router.sharedInstance().navigate('landing' ,{trigger: true, replace:true});
            return;
          }
          router.sharedInstance().navigate('users/'+user.id ,{trigger: true, replace:true});
          return;
        }
        var reviewCollection = new ReviewCollection([],{user: user});
        var userReviewList = new ReviewList({collection: reviewCollection, user: user});
        thisGuy.$el.html(userReviewList.render().el);
        reviewCollection.fetch();
        thisGuy.showNavigation(user);
      });
    },
    showUserSettings: function(uid){
      var thisGuy = this;
      this.getCurrentUser(uid, function(user, rightUser){
        //redirect if wrong user
        if(!rightUser){
          //check if the user has been logged out
          if(user.id == null){
            router.sharedInstance().navigate('landing' ,{trigger: true, replace:true});
            return;
          }
          router.sharedInstance().navigate('users/'+user.id+'/settings' ,{trigger: true, replace:true});
          return;
        }
        var userSettingsView = new UserSettingsView( {user: user} );
        thisGuy.$el.html( userSettingsView.render().el );
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

    getCurrentUser: function(uid, cb){
      /*
      var user = new User( {_id: uid});
      var usersCollection = new UsersCollection([user]);
      user.fetch({error: function(){
        console.log('err', err);
      }, success: function(model, res){
        cb(model);
      }});
*/

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
        //if the uid that is trying to be accessed doesn't match the session
        if (uid != model.id) {
          console.log('wrong user');
          //route back to the right user
          rightUser = false;
          /*
          console.log(router);
          console.log(router.sharedInstance);
          router.sharedInstance().navigate('users/'+model.id ,{trigger: true, replace:true});

          return;
          */
        };
        cb(model, rightUser);
      }});
    },
    
    /*showImageUploader: function() {
      var thisGuy = this;
      var s3Collection = new S3Collection();
      var imageUploderView = new ImageUploaderView({collection:s3Collection});
      thisGuy.$el.html(imageUploderView.render().el);
      s3Collection.fetch();
      //require(['stellar'], function(stellar) {
      //  $.stellar();
      //  $.stellar('refresh');
      //});

      //var imageUploaderView = new ImageUploaderView();
      //this.$el.html(imageUploaderView.render().el );
    }*/

    showImageUploader: function() {
      var imageUploaderView = new ImageUploaderView();
      this.$el.html( imageUploaderView.render());
    }
  });

  MainAppView.sharedInstance = _.once(function() {
    return new MainAppView();
  });

  return MainAppView;
});