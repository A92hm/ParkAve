var _ = require('underscore'),
    PaypalAPI = require('paypal-rest-sdk'),
    Spot = require('./../models/spot').Spot,
    User = require('./../models/user').User;

// PaypalAPI.configure({
//   'host': 'api.sandbox.paypal.com',
//   'port': '',
//   'client_id': 'AcVVohATeJpvJ2b1aMnmDAw_bg1EUceJrQGBE4Nt9xMA4_H8g-Gh5DQgLCjf',
//   'client_secret': 'EMgF2BASIuBwRttrHi09qc8VwFFJqdoO5eTy6o8ziAfsKsBF1HljBSazJd4F'
// });

var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
};

module.exports = {
  index: function(req, res) {
    console.log('spots index');
    Spot.find({lot_id: req.params.lid}, function(err, spots) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(spots);
      }
    });
  },
  show: function(req, res) {
    console.log('spots show');
    Spot.findById(req.params.sid, function(err, spot) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(spot);
      }
    });
  },
  create: function(req, res) {
    console.log('spots create');
    Spot.create(req.body, function(err, spot) {
      if (err) {
        res.status(500).json({err: 'internal error', content: err});
      } else if (req.body.numSpots < 0) {
        res.status(500).json({err: 'Cannot add a negative number of spots', content: err});
      } else {
       res.json(spot);
      }
    });
  },
  purchaseSpot: function(req, res) {
    var content = req.body;
    console.log('buying spot', content.spot_id);

    Spot.findById(content.spot_id, function(err, spot){
      if(err){
        res.status(500).json({err: 'spot not found'});
        return;
      }
      if(spot.numSpots <= 0){
        res.status(500).json({err: 'spot not available'});
        return;
      }
      console.log(spot);
      var create_payment_json = {
          "intent": "sale",
          "payer": {
              "payment_method": "credit_card",
              "funding_instruments": [{
                  "credit_card": {
                      "type": content.type,
                      "number": content.number,
                      "expire_month": content.expire_month,
                      "expire_year": content.expire_year,
                      "cvv2": content.cvv2,
                      "first_name": content.first_name,
                      "last_name": content.last_name,
                      "billing_address": content.billing_address
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
              res.status(500).json({err: 'error making payment'});
          }

          if (response) {
              console.log("Create Payment Response");
              console.log(response);
              Spot.findByIdAndUpdate(content.spot_id, {$inc: {numSpots: -1}, $addToSet: {buyer_list: content.user_id} },
                function(err, spot) {
                  if (err) {
                    console.log("spot update error", err);
                    res.status(500).json({err: 'internal error', content: err});
                  } else{
                    User.findByIdAndUpdate(content.user_id, {$addToSet: {reservedSpots: content.spot_id, spotHistory: content.spot_id}},
                      function(err, spot) {
                        if (err) {
                          console.log("user update error", err);
                          res.status(500).json({err: 'internal error', content: err});
                        } else {
                          res.json({ response: "Success"});
                        }
                    });
                  }
              });
          }
      });
    });
  },
  update: function(req, res) {
    console.log('spots update');
    var newSpot = {};
    _.each(req.body, function(value, key){
      if(key != "__v" && key != "_id"){
        newSpot[key] = value;
      }
    });
    Spot.findByIdAndUpdate(req.params.sid, newSpot, function(err){
      if(err){
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });   
  },
  destroy: function(req, res) {
    console.log('spots destroy');

    //destroy spot
    Spot.remove( {_id: req.params.sid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};