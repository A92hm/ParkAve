
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/list.html',
  'views/spot/spot-list-item', 'views/spot/spot-list-new'],
  function($, _, Backbone, Template, SpotListItemView, NewSpotView) {

  var SpotListView = Backbone.View.extend({
    tagName: 'div',
    className: 'spot-list',
    template: _.template( Template ),

    events: {
      'click a[href="#newspot"]': 'createNewSpot'
    },

    initialize: function() {
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'add', this.addOne);
    },

    render: function() {
      this.$el.html( this.template() );
      this.$spots = this.$el.find('#spots');
      return this;
    },

    addAll: function() {
      this.$spots.empty();
      this.collection.each(this.addOne, this);
    },

    addOne: function(spot) {
      var spotView = new SpotListItemView({model: spot});
      this.$spots.append( spotView.render().el );
    },

    createNewSpot: function(event) {
      this.newSpotView = new NewSpotView();
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
    }
  });

  return SpotListView;

});