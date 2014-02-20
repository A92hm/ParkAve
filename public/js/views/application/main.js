define(['jquery', 'underscore', 'backbone', 'text!templates/application/main.html',
        'views/landing/landing', 'views/landing/getstarted', 'views/landing/login', 'models/lot',  'collections/lots',
         'views/lot/lot-list', 'views/lot/lot'
         ], 
  function($, _, Backbone, Template, LandingView, GetStartedView, LoginView, Lot, LotsCollection, 
          LotsListView, LotView) {

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
    }
  });

  MainAppView.sharedInstance = _.once(function() {
    return new MainAppView();
  });

  return MainAppView;
});