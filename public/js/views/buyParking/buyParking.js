define(['jquery', 'underscore', 'backbone', 'text!templates/buyParking/buyParking.html',
        'collections/paypals', 'models/paypal', 'routing/router', 'collections/spots',
        'models/lot', 'collections/lots'],
  function($, _, Backbone, Template, PaypalPaymentsCollection, PaypalPayment, Router,
           SpotsCollection, Lot, LotsCollection) {

    var BuyParkingView = Backbone.View.extend({
      tagName: 'div',
      template: _.template( Template ),

      events: {
        'click .buy-parking-test': 'makePurchase'
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

      makePurchase: function() {
        var paypalPayment = new PaypalPayment({
          spot_id: "",
          user_id: this.user.get('_id'),
          type: 'visa',
          number: '4417119669820331',
          expire_month: '11',
          expire_year: '2018',
          cvv2: '874',
          first_name: 'Joe',
          last_name: 'Shopper',
          billing_address: {
              line1: '52 N Main ST',
              city: 'Johnstown',
              state: 'OH',
              postal_code: '43210',
              country_code: 'US'
          }
        });
        var paypalPayments = new PaypalPaymentsCollection([paypalPayment]);
        var lots = new LotsCollection([], {user: this.user});
        lots.fetch({success: function(lots){
          if(lots.length > 0){
            var spots = new SpotsCollection([], {lot: lots.at(0)});
            spots.fetch({success: function(spots){
              if(spots.length > 0){
                paypalPayment.set('spot_id', spots.at(0).get('_id'));
                paypalPayment.save();
              } else{
                alert('there are spots to fake buy');
              }
            }});
          }
        }});
      },
    });
    return BuyParkingView;
});
