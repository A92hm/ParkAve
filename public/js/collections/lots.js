define(['underscore','backbone', 'models/lot'], function(_, Backbone, Lot) {

  var LotsCollection = Backbone.Collection.extend({
    model: Lot,

    url: function() {
      return this.user.url() + '/lots';
    },

    initialize: function(models, options) {
      this.user = options.user;
      console.log('user url: '+ this.user.url());
    },

    clienturl: function() {
      return this.url().slice(4);
    }
  });

  return LotsCollection;
});