define(['jquery', 'underscore', 'backbone', 'text!templates/payment/payment.html',
        'models/user', 'models/session', 'collections/users',
        'collections/sessions', 'routing/router'],
  function($, _, Backbone, Template, User, Session, UsersCollection, SessionsCollection, Router) {

  var PaymentView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),
    events: {
      'click #change-credit-card': 'addCreditCard',
    },

    initialize: function(options) {
      this.user = options.user;
      this.listenTo(this.user, 'change', this.render);
      this.listenTo(this.user, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html( this.template( this.user.toJSON() ) );
      return this;
    }
  });

  return PaymentView;
});
