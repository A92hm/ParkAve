
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/spot.html',
  'routing/router', 'collections/spots', 'views/spot/spot-list-new'],
  function($, _, Backbone, Template, Router, SpotsCollection, NewSpotView) {


  var SpotView = Backbone.View.extend({
    tagName: 'div',
    className: 'spot',
    template: _.template( Template ),

    events: {
      'click a[href="#delete"]': 'deleteSpot',
      'click a[href="#spots"]': 'returnToSpots',
      'click a[href="#create-spot"]': 'createSpot'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this; 
    },

    returnToSpots: function() {
      var spots = new SpotsCollection();
      Router.sharedInstance().navigate(spots.clienturl(), {trigger: true});
      return false;
    },

    deleteSpot: function() {
      this.model.destroy({wait: true})
        .done(function(data) {
          { // pop back to spots. this is annoying
            var spots = new SpotsCollection();
            Router.sharedInstance().navigate(spots.clienturl(), {trigger: true});
          }
        })
        .fail(function(xhr, data) {
          console.log('there was a problem deleting the model');
        });
      return false;
    },

    createSpot: function() {
      this.newSpotView = new NewSpotView();
      this.newSpotView.render().$el.modal(); // .modal() is bootstrap
      this.listenTo(this.newSpotView, 'dialog:save', this.saveNewSpot);
      return false;
    }
  });

  return SpotView;
});