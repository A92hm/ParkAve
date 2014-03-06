
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
      var spotListView = new SpotListView( {model: this.collection, collection: this.spotsCollection} );  // model is the user. collection is the spots
      this.$el.find('#spot-view-div').html( spotListView.render().el );
      this.spotsCollection.fetch();
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
    },

    createSpot: function() {
      this.newSpotView = new NewSpotView( {model: this.model, collection: this.collection} );
      this.newSpotView.render().$el.modal(); // .modal() is bootstrap
      this.listenTo(this.newSpotView, 'dialog:save', this.saveNewSpot);
      return false;
    },

    saveNewSpot: function(event) {
      this.spotsCollection.create(this.newSpotView.spotAttributes);
      // really we should have some error handling here

      // dismiss the dialog
      this.stopListening(this.newSpotView); // stop listening to dialog:save
      this.newSpotView.$el.modal('hide'); // from bootstrap
      delete this.newSpotView; // delete reference
    }
  });

  return LotView;
});