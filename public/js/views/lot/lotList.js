define(['jquery', 'underscore', 'backbone', 'text!templates/lot/lotList.html',
  'views/lot/lotListItem', 'views/lot/newLotModal'],
  function($, _, Backbone, Template, LotListItemView, NewLotView) {

  var LotListView = Backbone.View.extend({
    tagName: 'div',
    className: 'lot-list',
    template: _.template( Template ),

    events: {
      'click #lot-list-add-lot-button': 'createNewLot'
    },

    initialize: function(options) {
      this.user = options.user;
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'add', this.addOne);
    },

    render: function() {
      this.$el.html( this.template() );
      this.$lots = this.$el.find('#lot-list-container-title');
      return this;
    },

    addAll: function() {
      this.$lots.empty();
      this.collection.each(this.addOne, this);
    },

    addOne: function(lot) {
      var lotListItemView = new LotListItemView({model: lot});
      this.$lots.after( lotListItemView.render().el );
    },

    createNewLot: function(event) {
      this.newLotView = new NewLotView( {user: this.user} );
      this.newLotView.render().$el.modal(); // .modal() is bootstrap
      this.listenTo(this.newLotView, 'dialog:save', this.saveNewLot);
      return false;
    },

    saveNewLot: function(event) {
      this.collection.create(this.newLotView.lotAttributes);
      // really we should have some error handling here

      // dismiss the dialog
      this.stopListening(this.newLotView); // stop listening to dialog:save
      this.newLotView.$el.modal('hide'); // from bootstrap
      delete this.newLotView; // delete reference
    }
  });

  return LotListView;

});