
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/spot.html',
  'routing/router', 'collections/spots'],
  function($, _, Backbone, Template, Router, SpotsCollection) {


  var SpotView = Backbone.View.extend({
    tagName: 'div',
    className: 'modal fade',
    id: 'new-spot-modal',
    template: _.template( Template ),

    events: {
      'click a[href="#delete"]': 'deleteSpot'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this; 
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
    }
  });

  return SpotView;
});