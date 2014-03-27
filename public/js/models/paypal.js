define(['underscore','backbone'], function(_, Backbone) {

  var Paypal = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
      "intent":"sale",
      "redirect_urls":{
        "return_url":"http://google.com/",
        "cancel_url":"http://bing.com/"
      },
      "payer":{
        "payment_method":"paypal"
      },
      "transactions":[
        {
          "amount":{
            "total":"7.50",
            "currency":"USD"
          }
        }
      ]
    },

    initialize: function() {
    }
  });

  return Paypal;
});