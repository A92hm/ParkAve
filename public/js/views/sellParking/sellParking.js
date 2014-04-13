define(['jquery', 'underscore', 'backbone', 'text!templates/sellParking/sellParking.html',
        'views/lot/lot', 'views/lot/lotList', 'routing/router', '/socket.io/socket.io'],
  function($, _, Backbone, Template, LotView, LotListView, Router, IO) {

    var SellParkingView = Backbone.View.extend({
      tagName: 'div',
      template: _.template( Template ),

      events: {
        'click .lot-list-item': 'renderLotView'
      },

      initialize: function(options) {
        this.user = options.user;

        this.listenTo(this.collection, 'add', this.renderLotView);
        this.listenTo(this.collection, 'remove', this.renderLotView);
        this.listenTo(this.collection, 'reset', this.render);
      },

      render: function() {
        this.$el.html( this.template( this.collection.toJSON() ) );
        var lotListView = new LotListView( {user: this.user, collection: this.collection} );
        this.$el.find('#sell-parking-dashboard-container').html( lotListView.render().el );

        this.renderLotView({});
        return this;
      },

      renderLotView: function(event){
        if(event.currentTarget){  // if something has been clicked
          $('.lot-list-item').removeClass('active');
          $('#' + event.currentTarget.id).addClass('active');
          var lotId = event.currentTarget.id.slice(event.currentTarget.id.lastIndexOf('-') + 1, event.currentTarget.id.length);
          this.lotView = new LotView( {model: this.collection.get(lotId), user: this.user} );
          this.$el.find('#lot-view-container').html( this.lotView.render().el );
        } else{
          if(!this.lotView){  // if the lot view has not been rendered yet
            this.lotView = new LotView( {model: this.collection.at(0), user: this.user} );
            this.$el.find('#lot-view-container').html( this.lotView.render().el );
            return;
          }
          if(this.lotView.model){  // if the model exists in the lot view
            var currentLotSelected = this.collection.get(this.lotView.model.get('_id'));
          }
          if(!currentLotSelected){  // if the current lot selected cannot be found
            this.lotView = new LotView( {model: this.collection.at(0), user: this.user} );
            this.$el.find('#lot-view-container').html( this.lotView.render().el );
          }
        }
      }
    });
    return SellParkingView;
});
