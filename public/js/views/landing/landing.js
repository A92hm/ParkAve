define(['jquery', 'underscore', 'backbone', 'text!templates/landing/landing.html',
        'views/landing/login', 'models/session',
        'collections/sessions', 'routing/router'],
  function($, _, Backbone, Template, LoginView, Session, SessionsCollection, Router) {

  var LandingView = Backbone.View.extend({
    tagName: 'div',
    className: 'landing-body-div',
    template: _.template( Template ),

    events: {
      'click #landing-get-started-button': 'openGetStartedPage',
      'click #landing-login-button': 'openLoginPage'
    },

    initialize: function() {
        // var parallaxScroll,
        // _this = this;

        // parallaxScroll = function() {
        //   var currentScrollPosition;
        //   currentScrollPosition = $(_this).scrollTop();
        //   $('.opening').css({
        //     'background-position': '50% ' + (-currentScrollPosition / 4) + 'px'
        //   });
        //   return $('.openingText').css({
        //     'margin-top': (currentScrollPosition / 4) + "px",
        //     'opacity': 1 - (currentScrollPosition / 250)
        //   });
        // };

        // $(document).ready(function() {
        //   $(window).scroll(function() {
        //     return parallaxScroll();
        //   });
        //   console.log($(window).scroll);
        //   return $(document).scroll(function() {
        //     var bottomOfOpening, compareWindowHeight, header, sideBar, windowHeight, windowTop;
        //     windowTop = $(window).scrollTop();
        //     bottomOfOpening = $('.opening').position().top + $('.opening').height();
        //     header = $('.header');
        //     sideBar = $('.sideBar');
        //     windowHeight = $(window).height();
        //     compareWindowHeight = (windowHeight - 70) + "px";
        //     if (bottomOfOpening > windowTop) {
        //       return header.css({
        //         'position': 'absolute',
        //         'top': '100%',
        //         'left': '0'
        //       });
        //     } else {
        //       return header.css({
        //         'position': 'fixed',
        //         'top': '0',
        //         'left': '0'
        //       });
        //     }
        //   });
        // });
    },

    render: function() {
      this.$el.html( this.template() );

      return this;
    },

    openGetStartedPage: function(){
      Router.sharedInstance().navigate('getstarted', {trigger: true});
      return false;
    },

    openLoginPage: function(){
      Router.sharedInstance().navigate('login', {trigger: true});
      return false;
    }
  });

  return LandingView;
});