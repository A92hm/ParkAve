define(['underscore','backbone', 'models/creditcardinfo'], function(_, Backbone, CreditCardInfo) {

  var CreditCardInfoCollection = Backbone.Collection.extend({
    model: CreditCardInfo,

    url: '/api/addpaymentmethod',

    initialize: function(models) {
    }
  });

  return CreditCardInfoCollection;
});
