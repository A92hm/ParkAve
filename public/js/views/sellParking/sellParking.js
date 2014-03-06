define(['jquery', 'underscore', 'backbone', 'text!templates/sellParking/sellParking.html',
        'views/lot/lot', 'views/lot/lot-list', 'routing/router'],
  function($, _, Backbone, Template, LotView, LotListView, Router) {

    var SellParkingView = Backbone.View.extend({
      tagName: 'div',
      template: _.template( Template ),

      events: {
        'click .lot-list-item': 'renderLotView'
      },

      initialize: function() {
        this.listenTo(this.collection, 'change', this.renderLotView);
        this.listenTo(this.collection, 'destroy', this.remove);
      },

      render: function() {
        this.$el.html( this.template( this.collection.toJSON() ) );
        var lotListView = new LotListView( {model: this.model, collection: this.collection} );
        this.$el.find('#lot-list-view-container').html( lotListView.render().el );
        if(this.collection.length > 0){
          var lotView = new LotView( {model: this.collection.at(0), collection: this.model} );
          this.$el.find('#lot-view-container').html( lotView.render().el );
        }
        return this;
      },

      renderLotView: function(event){
        if(event.currentTarget){
          var lotId = event.currentTarget.id.slice(event.currentTarget.id.lastIndexOf('-') + 1, event.currentTarget.id.length);
          var lotView = new LotView( {model: this.collection.get(lotId), collection: this.model} );
          this.$el.find('#lot-view-container').html( lotView.render().el );
        } else{
          var lotView = new LotView( {model: this.collection.at(0), collection: this.model} );
          this.$el.find('#lot-view-container').html( lotView.render().el );
        }
      }
    });
    return SellParkingView;
});
