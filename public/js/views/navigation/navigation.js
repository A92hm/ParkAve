define(['jquery', 'underscore', 'backbone', 'text!templates/navigation/navigation.html',
        'text!templates/navigation/userNavItem.html', 'text!templates/navigation/signUpNavItem.html',
        'models/user', 'routing/router', 'models/session', 'collections/sessions'],
  function($, _, Backbone, Template, UserNavItemTemplate, SignUpNavItemTemplate, User, Router, Session, SessionCollection) {

    var NavigationView = Backbone.View.extend({
      tagName: 'div',
      className: 'soba-navbar-container',
      template: _.template( Template ),

      events: {
        'click #nav-buy-parking': 'showBuyParkingPage',
        'click #nav-sell-parking': 'showSellParkingPage',
        'click #nav-feedback':     'showFeedbackPage', 
        'click #nav-sign-up': 'showGetStartedPage',
        'click #nav-login': 'showLoginPage',
        'click #nav-user-transactions': 'showUserTransactionsPage',
        'click #nav-user-reviews': 'showUserReviewsPage',
        'click #nav-user-settings': 'showUserSettingsPage',
        'click #nav-user-logout' : 'logoutUser',
        'click #main-navbar-logo': 'showLanding',
        'click .navbar-dropdown-li': 'openDropdown'
      },

      initialize: function() {
        if(!this.model){
          this.model = new User();
        }
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
      },

      render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        if(this.model.get('_id')){
          var userNavItem = _.template( UserNavItemTemplate );
          this.$el.find('#main-navbar').append( userNavItem( this.model.toJSON() ) );
        } else{
          var signUpNavItem = _.template( SignUpNavItemTemplate );
          this.$el.find('#main-navbar').append( signUpNavItem( this.model.toJSON() ) );
        }
        return this;
      },

      showUserSettingsPage: function(){
        if($('.user-settings-div').length != 0){
          return true;
        }
        if(this.model.get('_id')){
          Router.sharedInstance().navigate('users/settings', {trigger: true});
        }
        return false;
      },
      logoutUser: function(){
        var session = new Session({email: "logout", password: "logout"});//pass the logout to the server
        var sessionsCollection = new SessionCollection([session]);
        session.save({}, {error: function(err){
          console.log('err', err);
        }, success: function(model, response){
            console.log('logged out')
            //navigate back to the landing
            Router.sharedInstance().navigate('landing', {trigger: true});
        }});

        return false;
      },
      showBuyParkingPage: function(){
        if(this.model.get('_id')){
          Router.sharedInstance().navigate('buy', {trigger: true});
        }
        return false;
      },

      showFeedbackPage: function(){
        // Router.sharedInstance().navigate('users/'+this.model.get('_id') +'/feedback', {trigger: true});
        Router.sharedInstance().navigate('feedback', {trigger: true});
        return false;
      },

      showSellParkingPage: function(){
        if(this.model.get('_id')){
          Router.sharedInstance().navigate('sell', {trigger: true});
        }
        return false;
      },

      showLanding: function(){
        Router.sharedInstance().navigate('landing', {trigger: true});
        return false;
      },

      showGetStartedPage: function(){
        Router.sharedInstance().navigate('getstarted', {trigger: true});
        return false
      },

      showLoginPage: function(){
        Router.sharedInstance().navigate('landing/login', {trigger: true});
        return false
      },

      showUserTransactionsPage: function(){
        if(this.model.get('_id')){
          Router.sharedInstance().navigate('users/lots', {trigger: true});
        }
        return false;
      },

      showUserReviewsPage: function(){
        if(this.model.get('_id')){
          Router.sharedInstance().navigate('users/feedback', {trigger: true});
        }
        return false;
      },

      openDropdown: function(){
        this.$el.find('.navbar-dropdown-li').toggleClass('open');
      }
    });
    return NavigationView;
});


