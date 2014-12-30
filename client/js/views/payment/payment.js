define(['jquery', 'underscore', 'backbone', 'text!templates/payment/payment.html',
        'models/user', 'models/session', 'collections/users',
        'collections/sessions', 'routing/router', 'models/creditcardinfo',
        'collections/creditcardinfocollections'],
  function($, _, Backbone, Template, User, Session, UsersCollection, SessionsCollection, Router, PaymentModel, PaymentCollection) {

  var PaymentView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),
    events: {
      'click #add-credit-card': 'addCreditCard',
    },

    initialize: function(options) {
      this.user = options.user;
      this.listenTo(this.user, 'change', this.render);
      this.listenTo(this.user, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html( this.template( this.user.toJSON() ) );
      return this;
    },

    addCreditCard: function() {
      var newPaymentModel = new PaymentModel( {
           'type': 'visa',
           'number': '4417119669820331',
           'expire_month': '11',
           'expire_year': '2018',
           'cvv2': '874',
           'first_name': 'Joe',
           'last_name': 'Shopper',
           'billing_address': {
             'line1': '52 N Main ST',
             'city': 'Johnstown',
             'state': 'OH',
             'postal_code': '43210',
             'country_code': 'US'
             },
            'payer_id': this.user.get('_id')
      } );
      var cardCollection = new PaymentCollection([newPaymentModel]);
      cardCollection.create(newPaymentModel);
      return false;
    }
  });

  return PaymentView;
});
