
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
      'click .spot-list-item': 'toggleEditSpotModal'
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

    renderEditSpotView: function(element, model, lot, user, isParent){
      this.editSpotView = new EditSpotView( {model: model, lot: lot, user: user} );
      if(isParent){
        element.append( this.editSpotView.render().el );
      } else{
        element.after( this.editSpotView.render().el );
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
    },

    createNewSpot: function(event) {
      if(this.$el.find('.new-spot-save-button').length > 0){
        return;
      }
      var element = this.$el.find('.spot-list-last');
      var isParent = false;
      if(element.length == 0){
        element = this.$el.find('#spot-list-view-table-body');
        isParent = true;
      }
      this.renderEditSpotView(element, undefined, this.model, this.user, isParent);
      this.listenTo(this.editSpotView, 'spots:save', this.saveNewSpot);
      this.listenTo(this.editSpotView, 'spots:cancel', this.cancelEditSpot);
      return false;
    },

    saveNewSpot: function(event) {
      var thisGuy = this;
      this.spotsCollection.create(this.editSpotView.spotAttributes, {success: function(spot){
        thisGuy.spotListView.addOne(spot);
      }});
      // really we should have some error handling here

      this.cancelEditSpot();
    },

    cancelEditSpot: function(){
      this.stopListening(this.editSpotView);
      this.editSpotView.$el.remove();
      delete this.editSpotView; // delete reference
    },

    toggleEditSpotModal: function(event) {
      if(event.currentTarget && this.$el.find('.new-spot-save-button').length == 0){
        var spotId = event.currentTarget.id.slice(event.currentTarget.id.lastIndexOf('-') + 1, event.currentTarget.id.length);
        this.renderEditSpotView(this.$el.find('#' + event.currentTarget.id), this.spotsCollection.get(spotId), this.model, this.user);
        this.editSpotView.$el.find('.new-spot-save-button').html('Save changes');
        this.listenTo(this.editSpotView, 'spots:save', this.saveEditedSpot);
        this.listenTo(this.editSpotView, 'spots:cancel', this.cancelEditSpot);
      } else {
        this.stopListening(this.editSpotView);
        this.editSpotView.$el.remove();
        delete this.editSpotView; // delete reference
      }
      return false;
    },

    saveEditedSpot: function(){
      var spot = this.spotsCollection.get(this.editSpotView.spotAttributes.spotId);
      this.editSpotView.spotAttributes.spotId = undefined;
      spot.save(this.editSpotView.spotAttributes);

      this.cancelEditSpot();
    }
  });

  return LotView;
});