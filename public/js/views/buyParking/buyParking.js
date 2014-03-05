define(['jquery', 'underscore', 'backbone', 'text!templates/buyParking/buyParking.html', 'routing/router'],
  function($, _, Backbone, Template, Router) {

    var BuyParkingView = Backbone.View.extend({
      tagName: 'div',
      template: _.template( Template ),

      events: {
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
      },

      render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
      }
    });
    return BuyParkingView;
});
