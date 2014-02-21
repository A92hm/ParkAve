define(['underscore','backbone', 'models/lot'], function(_, Backbone, Lot) {

  var LotsCollection = Backbone.Collection.extend({
    model: Lot,
    url: '/api/lots',

    clienturl: function() {
      return this.url.slice(4);
    }
  });

  return LotsCollection;
});