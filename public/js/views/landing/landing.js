define(['jquery', 'underscore', 'backbone', 'text!templates/landing/landing.html',
        'views/landing/login', 'models/session',
        'collections/sessions', 'routing/router'],
  function($, _, Backbone, Template, LoginView, Session, SessionsCollection, Router) {

  var LandingView = Backbone.View.extend({
    tagName: 'div',
    className: 'landing-body-div',
    template: _.template( Template ),

    events: {
      'keypress #email-input': 'checkEmailInputForEnterKey',
      'click #submit-email-button': 'submitEmail'
    },

    initialize: function() {
        var parallaxScroll,
        _this = this;

        parallaxScroll = function() {
          var currentScrollPosition;
          currentScrollPosition = $(_this).scrollTop();
          $('.opening').css({
            'background-position': '50% ' + (-currentScrollPosition / 4) + 'px'
          });
          return $('.openingText').css({
            'margin-top': (currentScrollPosition / 4) + "px",
            'opacity': 1 - (currentScrollPosition / 250)
          });
        };

        $(document).ready(function() {
          $(window).scroll(function() {
            return parallaxScroll();
          });
          return $(document).scroll(function() {
            var bottomOfOpening, compareWindowHeight, header, sideBar, windowHeight, windowTop;
            windowTop = $(window).scrollTop();
            bottomOfOpening = $('.opening').position().top + $('.opening').height();
            header = $('.header');
            sideBar = $('.sideBar');
            windowHeight = $(window).height();
            compareWindowHeight = (windowHeight - 70) + "px";
            if (bottomOfOpening > windowTop) {
              return header.css({
                'position': 'absolute',
                'top': '100%',
                'left': '0'
              });
            } else {
              return header.css({
                'position': 'fixed',
                'top': '0',
                'left': '0'
              });
            }
          });
        });
    },

    render: function() {
      this.$el.html( this.template( ) );

      return this;
    },

    submitEmail: function(){
      var email = this.$el.find('#email-input').val();

      var session = new Session({email: email, password: "N/A"});
      var sessionsCollection = new SessionsCollection([session]);
      var openLoginModal = this.openLoginModal;
      var openGetStartedPage = this.openGetStartedPage;
      session.save({}, {error: function(err){
        console.log('err', err);
      }, success: function(model, response){
        if(!response._id){
          if(response.err == 'nomatch'){
            openLoginModal(email);
          } else{
            openGetStartedPage(email);
          }
        }
      }});

      // //TODO check database for email key. Branch out accordingly to either login or get started
      // if(confirm('Press OK to Login. Press Cancel to Sign Up.')){
      //   this.openLoginModal(email);        
      // } else{
      //   this.openGetStartedPage(email);
      // }
    },

    openGetStartedPage: function(email){
      if(email){
        Router.sharedInstance().navigate('getstarted/' + email, {trigger: true});
      }
      return false;
    },

    openLoginModal: function(email){
      var animateTime = 800;
      $('#landing-page-content-block').animate({
          'width': '0',
          'margin-left': '100%'
        }, animateTime);
      var loginModel = new Backbone.Model( {email: email, animateTime: animateTime} );
      var loginView = new LoginView( {model: loginModel} );
      $('.landing-body-div').append( loginView.render().el );
      return false;
    },

    checkEmailInputForEnterKey: function(evt){
      if(evt.keyCode == 13){
        this.submitEmail();
        return false;
      }
    }
  });

  return LandingView;
});