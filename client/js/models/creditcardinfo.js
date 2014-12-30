define(['underscore','backbone'], function(_, Backbone) {

  var CreditCardInfo = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
      type   : 'undefined',
      number : 'undefined',
      expire_month: '00',
      expire_year : '0000', 
      cvv2 : 'undefined', 
      first_name : 'undefined',
      last_name  : 'undefined', 
      billing_address: { 
        line1 : 'undefined',
        city : 'undefined',
        state : 'undefined',
        postal_code : 'undefined',
        country_code : 'US'
      },
      payer_id: ''
    },
      
    initialize: function() {
      
    },

    clienturl: function() {
      return this.url().slice(4);
    }

  });

  return CreditCardInfo;
});