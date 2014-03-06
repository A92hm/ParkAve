
define(['jquery', 'underscore', 'backbone', 'text!templates/lot/lot.html', 'text!templates/lot/lotViewEmpty.html',
        'routing/router', 'collections/lots', 'collections/spots', 'collections/users',
        'views/spot/spotList', 'views/spot/newSpotModal', 'models/user'],
  function($, _, Backbone, Template, LotViewEmptyTemplate, Router, LotsCollection,
           SpotsCollection, UsersCollection, SpotListView, NewSpotView, User) {


  var LotView = Backbone.View.extend({
    tagName: 'div',
    className: 'lot-view',
    template: _.template( Template ),

    events: {
      'click #spot-list-add-spot-button': 'createSpot'
    },

    initialize: function() {
      if(this.model){
        this.spotsCollection = new SpotsCollection([], {lot: this.model});
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
      }
    },

    render: function() {
      if(this.model){
        this.$el.html( this.template( this.model.toJSON() ) );
        this.renderSpots();
      } else {
        this.$el.html( LotViewEmptyTemplate );
      }
      return this; 
    },

    renderSpots: function() {
      console.log(this.spotsCollection);
      var spotListView = new SpotListView( {model: this.collection, collection: this.spotsCollection} );  // model is the user. collection is the spots
      this.$el.find('#spot-view-div').html( spotListView.render().el );
      if(this.model.get('_id')){
        this.spotsCollection.fetch();
      }
    },

    deleteLot: function() {
      this.model.destroy({wait: true})
        .done(function(data) {
          // good to go
          console.log('deleting now...');
        })
        .fail(function(xhr, data) {
          console.log('there was a problem deleting the model');
        });
      this.remove();
      this.model.collection.remove(this.model);
      return false;
    }
  });

  return LotView;
});