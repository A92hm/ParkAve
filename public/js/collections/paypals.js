define(['underscore','backbone', 'models/paypal'], function(_, Backbone, PaypalPayment) {

  var PaypalPaymentCollection = Backbone.Collection.extend({
    model: PaypalPayment,

    url: '/api/purchase',

    initialize: function(models) {
    }
  });

  return PaypalPaymentCollection;
});