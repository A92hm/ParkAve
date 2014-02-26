define(['underscore','backbone', 'models/lot'], function(_, Backbone, Lot) {

  var LotsCollection = Backbone.Collection.extend({
    model: Lot,

    url: function() {
      return '/api/lots'
      // return this.lots.url() + '/comments';
    },

    initialize: function(models, options) {
      // this.lots = options.lots;
    },
    // url: this.seller.url()+'/lots',
    // url: '/lots',

    clienturl: function() {
      return this.url.slice(4);
    }
  });

  return LotsCollection;
});