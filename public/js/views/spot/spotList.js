
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/spotList.html',
        'views/spot/spotListItem', 'views/spot/newSpotModal', 'views/spot/spot'],
  function($, _, Backbone, Template, SpotListItemView, NewSpotView, SpotView) {

  var SpotListView = Backbone.View.extend({
    tagName: 'div',
    className: 'spot-list-div',
    template: _.template( Template ),

    events: {
      'click #spot-list-add-spot-button': 'createNewSpot',
        'click .spot-list-item': 'openEditSpotModal'
    },

    initialize: function() {
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'add', this.addOne);
    },

    render: function() {
      this.$el.html( this.template() );
      this.$spots = this.$el.find('#spot-list-container-title');
      return this;
    },

    addAll: function() {
      this.$spots.empty();
      this.collection.each(this.addOne, this);
    },

    addOne: function(spot) {
      var spotView = new SpotListItemView({model: spot});
      this.$spots.after( spotView.render().el );
    },

    createNewSpot: function(event) {
      this.newSpotView = new NewSpotView( {model: this.model, collection: this.collection} ); // model is the lot, collection is the user
      this.newSpotView.render().$el.modal(); // .modal() is bootstrap
      this.listenTo(this.newSpotView, 'dialog:save', this.saveNewSpot);
      return false;
    },

    saveNewSpot: function(event) {
      this.collection.create(this.newSpotView.spotAttributes);
      // really we should have some error handling here

      // dismiss the dialog
      this.stopListening(this.newSpotView); // stop listening to dialog:save
      this.newSpotView.$el.modal('hide'); // from bootstrap
      delete this.newSpotView; // delete reference
    },

    openEditSpotModal: function(event) {
      if(event.currentTarget){
        var spotId = event.currentTarget.id.slice(event.currentTarget.id.lastIndexOf('-') + 1, event.currentTarget.id.length);
        this.spotView = new SpotView( {model: this.collection.get(spotId), collection: this.model} );
        $('#content').after( this.spotView.render().el );
        $('#new-spot-modal').modal();
        this.listenTo(this.spotView, 'dialog:save', this.saveEditedSpot); // TODO implement editing
      }
      return false;
    },
  });

  return SpotListView;

});