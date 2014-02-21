define(['underscore','backbone'], function(_, Backbone) {

  var Lot = Backbone.Model.extend({
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

  return Lot;
});