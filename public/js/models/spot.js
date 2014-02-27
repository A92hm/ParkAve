define(['underscore','backbone'], function(_, Backbone) {

  var Spot = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
      title: 'Untitled',
      spot_id: this.idAttribute,
      parkingSurface: "Grass",
      price: 0,
      buyer_id: [],
      event_id: "",
      lot_id: ""
    },

    initialize: function() {
      
    },

    clienturl: function() {
      return this.url().slice(4);
    }
  });

  return Spot;
});