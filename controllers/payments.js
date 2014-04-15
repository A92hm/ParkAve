var _ = require('underscore'),
  PaypalAPI = require('paypal-rest-sdk'),
  Spot = require('./../models/spot').Spot,
  User = require('./../models/user').User;

var config_opts = {
  'host': 'api.sandbox.paypal.com',
  'port': '',
  'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
  'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
};

module.exports = {
  addCreditCard: function (req, res) {
    var content = req.body;
    User.findById(content.payer_id, function (err, user) {
      if (err) {
        res.status(511).json({
          err: 'user not found'
        });
        return;
      }
      var create_card_details = {
        "type": content.type,
        "number": content.number,
        "expire_month": content.expire_month,
        "expire_year": content.expire_year,
        "cvv2": content.cvv2,
        "first_name": content.first_name,
        "last_name": content.last_name,
        "billing_address": content.billing_address,
        "payer_id": content.payer_id
      };

      PaypalAPI.credit_card.create(create_card_details, config_opts, function (error, credit_card) {
        if (error) {
          res.status(526).json({
            err: 'Not a valid Credit card.'
          });
        } else {
          user.creditCard = credit_card.id;
          res.status(200).json({ response: "Success"});
          // user.save(function (err2, user) {
          //   if (err2) {
          //     res.status(596).json({
          //       err: 'unable to save credit card'
          //     });
          //   } else {
          //     res.status(200).json({ response: "Success"});
          //     console.log('success');
          //   }
          // });
        }
      });
    });
  },
  purchaseSpot: function (req, res, sockets) {
    var content = req.body;
    console.log('buying spot', content.spot_id);

    Spot.findById(content.spot_id, function (err, spot) {
      if (err) {
        res.status(500).json({
          err: 'spot not found'
        });
        return;
      }
      if (spot.numSpots <= spot.buyer_list.length) {
        res.status(500).json({
          err: 'spot not available'
        });
        return;
      }

      User.findById(content.user_id, function (err1, user) {
        if (err1) {
          res.status(500).json({
            err: 'user not found'
          });
          return;
        }
        if (!user.creditCard) {
          res.status(500).json({
            err: 'no credit card'
          });
          return;
        }

        var create_payment_json = {
          "intent": "sale",
          "payer": {
            "payment_method": "credit_card",
            "funding_instruments": [{
              "credit_card_token": {
                "credit_card_id": user.creditCard,
                "payer_id": user._id
              }
            }]
          },
          "transactions": [{
            "amount": {
              "total": spot.price,
              "currency": "USD",
              "details": {
                "subtotal": spot.price
              }
            },
            "description": "This is the payment transaction description."
          }]
        };
        PaypalAPI.payment.create(create_payment_json, config_opts, function (err, response) {
          if (err) {
            console.log(err);
            res.status(500).json({
              err: 'error making payment'
            });
          }

          if (response) {
            console.log("Create Payment Response");
            console.log(response);
            Spot.findByIdAndUpdate(content.spot_id, {
                $addToSet: {
                  buyer_list: content.user_id
                }
              },
              function (err, spot) {
                if (err) {
                  console.log("spot update error", err);
                  res.status(500).json({
                    err: 'internal error',
                    content: err
                  });
                } else {
                  User.findByIdAndUpdate(content.user_id, {
                      $addToSet: {
                        reservedSpots: content.spot_id,
                        spotHistory: content.spot_id
                      }
                    },
                    function (err, spot) {
                      if (err) {
                        console.log("user update error", err);
                        res.status(500).json({
                          err: 'internal error',
                          content: err
                        });
                      } else {
                        sockets.emit('updatedSpot', spot);
                        res.status(200).json({ response: "Success"});
                      }
                    });
                }
              });
          }
        });
      });
    });
  }
};