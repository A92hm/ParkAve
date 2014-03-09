
define(['jquery', 'underscore', 'backbone', 'text!templates/lot/lot.html', 'text!templates/lot/lotViewEmpty.html',
        'routing/router', 'collections/lots', 'collections/spots', 'collections/users',
        'views/spot/spotList', 'views/spot/editSpot', 'models/user'],
  function($, _, Backbone, Template, LotViewEmptyTemplate, Router, LotsCollection,
           SpotsCollection, UsersCollection, SpotListView, EditSpotView, User) {


  var LotView = Backbone.View.extend({
    tagName: 'div',
    className: 'lot-view',
    template: _.template( Template ),

    events: {
      'click #spot-list-add-spot-button': 'createNewSpot',
      'click .spot-list-item': 'openEditSpotModal'
    },

    initialize: function(options) {
      this.user = options.user;
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
      if(this.model.get('_id')){
        var thisGuy = this;
        this.spotsCollection.fetch({success: function(res){
          thisGuy.spotListView = new SpotListView( {collection: res, user: thisGuy.user} );
          thisGuy.$el.find('#spot-view-div').html( thisGuy.spotListView.render().el );
        }});
      }
    },

    renderEditSpotView: function(siblingElement, model, lot, user){
      this.editSpotView = new EditSpotView( {model: model, lot: lot, user: user} );
      siblingElement.after( this.editSpotView.render().el );
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

    createNewSpot: function(event) {
      this.renderEditSpotView(this.$el.find('.spot-list-last'), undefined, this.model, this.user);
      this.listenTo(this.editSpotView, 'dialog:save', this.saveNewSpot);
      return false;
    },

    saveNewSpot: function(event) {
      var thisGuy = this;
      this.spotsCollection.create(this.editSpotView.spotAttributes, {success: function(spot){
        thisGuy.spotListView.addOne(spot);
      }});
      // really we should have some error handling here

      // dismiss the dialog
      this.stopListening(this.editSpotView); // stop listening to dialog:save
      this.editSpotView.$el.remove();
      delete this.editSpotView; // delete reference
    },

    openEditSpotModal: function(event) {
      if(event.currentTarget){
        var spotId = event.currentTarget.id.slice(event.currentTarget.id.lastIndexOf('-') + 1, event.currentTarget.id.length);
        this.renderEditSpotView(this.$el.find('#' + event.currentTarget.id), this.spotsCollection.get(spotId), this.model, this.user);
        this.editSpotView.$el.find('.new-spot-save-button').html('Save changes');
        this.listenTo(this.editSpotView, 'dialog:save', this.saveEditedSpot);
      }
      return false;
    },

    saveEditedSpot: function(){
      var spot = this.spotsCollection.get(this.editSpotView.spotAttributes.spotId);
      this.editSpotView.spotAttributes.spotId = undefined;
      spot.save(this.editSpotView.spotAttributes);

      // dismiss the dialog
      this.stopListening(this.editSpotView); // stop listening to dialog:save
      this.editSpotView.$el.remove();
      delete this.editSpotView; // delete reference
    }
  });

  return LotView;
});