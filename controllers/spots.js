var _ = require('underscore'),
    Spot = require('./../models/spot').Spot,
    Lot  = require('./../models/lot').Lot;
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
      } else {
        Lot.findById(spot.lot_id, function(err, lot){
          if(err){
            console.log('error');
          }else{
            console.log('creating average');
            var oldNumber = lot.numberOfSpots;
            lot.numberOfSpots++;
            lot.averagePrice = (lot.averagePrice*oldNumber + spot.price) / lot.numberOfSpots;
            //update the lot on the server
            Lot.findByIdAndUpdate(lot._id, lot, function(err){
              if(err){
                res.status(500).json({err: 'internal error'});
              } else {
                console.log('Lot average updated');
              }
            });

            res.json(spot);
          }
        });
      }
    });
  },
  update: function(req, res) {
    console.log('spots update');

    Spot.findById(req.params.sid, function(err, spot) {
      if (err) {
        res.status(500).json({err: 'internal error', content: err});
      } else {
        Lot.findById(spot.lot_id, function(err, lot){
          if(err){}else{
            var oldNumber = lot.numberOfSpots;
            lot.numberOfSpots--;
            lot.averagePrice = (lot.averagePrice*oldNumber - spot.price) / lot.numberOfSpots;
            //
            //
             //update the spot\\
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
                //change the average price again
                oldNumber = lot.numberOfSpots;
                lot.numberOfSpots++;
                lot.averagePrice = (lot.averagePrice*oldNumber + spot.price) / lot.numberOfSpots;
                //update the lot on the server
                Lot.findByIdAndUpdate(lot._id, lot, function(err){
                  if(err){
                    res.status(500).json({err: 'internal error'});
                  } else {
                    console.log('Lot average updated');
                  }
                });
                res.json({msg:'success'});
              }
            });
            
          }
        });
      }
    });

   
  },
  destroy: function(req, res) {
    console.log('spots destroy');
    Spot.findById(req.params.sid, function(err, spot) {
      if (err) {
        res.status(500).json({err: 'internal error', content: err});
      } else {
        Lot.findById(spot.lot_id, function(err, lot){
          if(err){}else{
            var oldNumber = lot.numberOfSpots;
            lot.numberOfSpots--;
            lot.averagePrice = (lot.averagePrice*oldNumber - spot.price) / lot.numberOfSpots;
            //destroy spot
            Spot.remove( {_id: req.params.sid}, function(err) {
              if (err) {
                res.status(500).json({err: 'internal error'});
              } else {
                res.json({msg:'success'});
              }
            });
          }
        });
      }
    });

    
  }
};