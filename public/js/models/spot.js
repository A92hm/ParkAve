define(['underscore','backbone'], function(_, Backbone) {

  var Spot = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
      numSpots: 0,
      price: 0,
      startDate: new Date(),
      endDate: new Date(),
      parkingSurface: "Grass",
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