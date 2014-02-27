define(['underscore','backbone', 'models/lot'], function(_, Backbone, Spot) {

  var SpotsCollection = Backbone.Collection.extend({
    model: Spot,

    url: function() {
      return this.lot.url() + '/spots';
    },

    initialize: function(models, options) {
      this.lot = options.lot;
    },
    
    clienturl: function() {
      return this.url.slice(4);
    }
  });

  return SpotsCollection;
});