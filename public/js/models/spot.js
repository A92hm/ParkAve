define(['underscore','backbone'], function(_, Backbone) {

  var Spot = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
      title: 'Untitled'
    },

    initialize: function() {
      
    },

    clienturl: function() {
      return this.url().slice(4);
    }
  });

  return Spot;
});