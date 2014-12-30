define(['underscore','backbone'], function(_, Backbone) {

  var Lot = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
      title: 'Untitled',
      lat: 120,
      lon: 120,
      address: {
        address1: "Foo",
        address2: "",
        city: "New York",
        zip: "66232",
        state: "HI"
      }
    },

    initialize: function() {
      
    },

    clienturl: function() {
      return this.url().slice(4);
    }
  });

  return Lot;
});