 var _ = require('underscore'),
    Lot = require('../models/lot').Lot,
    Spot = require('../models/spot').Spot,
    Review = require('../models/review').Review;


//set a user id to get the lots for user or set the lot id to get averages for that lot, don't set either to set averages on all of the lots
//if you just want a single lot then your call back should be function(minPrice,aveRating)
function getAverages(lotID, userID, callback, res){
  if(lotID == ""){
    var newLots = [];
    var count = 0;
    //if the user id isn't null then set the parameters to find the lots for user
    var theParams = {};
    if(userID != ""){
      theParams = {user_id: userID};
    }
    Lot.find(theParams, function(err, lots) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      }else {
        var count = 0;
        var numOfLots = lots.length;
        if(numOfLots == 0){
          //no lots so return
          callback(newLots);
        }
        _.each(lots, function(lot){
          //recursivly call to set averages for each lot
          getAverages(lot._id, lot.user_id, function(newLot){
            //set average for each one using this method
            newLots[count] = newLot;
            count++;
            //need callback with the fixed lots durring the last individual callback to make sure all of the information is there
            if(count == numOfLots){
              callback(newLots);
            }
          }, res);
        });        
      }
    });
  }
  else {
    Lot.findById(lotID, function(err, lot){
      if(err){res.status(500).json({err: 'internal error finding lot'});}
      else{
        //now to do everything we need to do the lot
        //first get the average price and continue from there through callbacks
        Spot.find({lot_id: lot._id}, function(err,spots){
          if(err){res.status(500).json({err: 'internal error finding spots'});}
          else{
            var total = 0;
            var count = 0;
            var tick = 0;
            var totalSpots = spots.length;
            var currentMin = -1;
            if(totalSpots != 0){
              _.each(spots, function(spot){
                if(currentMin == -1 || spot.price < currentMin){
                  currentMin = spot.price;
                }
                tick++;
                count++;
                //need to put this in here or else it will skip the lots
                if(tick == totalSpots){
                  //now find the average rating
                  Review.find({reviewee_id: lot.user_id}, function(err, reviews) {
                    if (err) {res.status(500).json({err: 'internal error'});} 
                    else {
                      count = 0;
                      total = 0;
                      _.each(reviews, function(review){
                        total = total + review.stars;
                        count = count + 1;
                      });
                      //callback from here to avoid the ratings now being included
                      if(count > 0){
                        lot.minimumPrice = currentMin;
                        lot.averageRating = total/count;
                        callback(lot);
                      }
                      else{
                        lot.minimumPrice = currentMin;
                        lot.averageRating = -1;
                        callback(lot);
                      }
                    }
                  }); 
                }
              });
            }
            else{
              //just get the review average because there are no spots
              Review.find({reviewee_id: lot.user_id}, function(err, reviews) {
                  if (err) {res.status(500).json({err: 'internal error'});} 
                  else {
                    _.each(reviews, function(review){
                      total = total + review.stars;
                      count = count + 1;
                    });
                    //callback from here to avoid the ratings now being included
                    if(count > 0){
                        lot.minimumPrice = -1;
                        lot.averageRating = total/count;
                        callback(lot);
                      }
                        
                      else{
                        lot.minimumPrice = -1;
                        lot.averageRating = -1;
                        callback(lot);
                      }      
                  }
                }); 
            }
          }
        });
      }
    });
  }
}

function getNearbyLots(req, res, cb) {
  var json = req.params.json.split('+');
  // Some error checking
  if (json.length != 3) {
    return res.status(500).json({err: 'Incorrect number of arguments'});
  } else if (!isFinite(json[0]) || !isFinite(json[0]) || !isFinite(json[0])) {
    return res.status(500).json({err: 'Not all input numeric'});
  }
  // Defined as distance in miles / 7 miles
  var delta = json[2] / 7 * 0.1;
  var latitude = +json[0];
  var longitude = +json[1];
  Lot.find( {lat: {$gte: (latitude - delta), $lte: (latitude + delta)},
            lon: {$gte: (longitude - delta), $lte: (longitude + delta)}
          }, cb);
}


module.exports = {
  index: function(req, res) {

    getAverages("",req.params.uid,function(newLots){
      res.json(newLots);
    }, res);
    /*
    Lot.find({user_id: req.params.uid}, function(err, lots) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(lots);
      }
    });
*/
  },
  // req.params.json should contain
  // lat+lng+dist
  nearbyLots: function(req, res) {
    getNearbyLots(req, res, function(err, lots){
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(lots);
      }
    });
  },
  nearbyLotsAndSpots: function(req, res) {
    getNearbyLots(req, res, function(err, lots){
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        Spot.find({}, function(err, spots){
          if (err) {
            res.status(500).json({err: 'internal error'});
          } else {
            var responseObj = {};
            responseObj.lots = lots;
            responseObj.spots = spots;
            res.json(responseObj);
          }
        });
      }
    });
  },
  show: function(req, res) {
    getAverages(req.params.lid, '', function(lot){
      res.json(lot);
    }, res);
    /*
    Lot.findById(req.params.lid, function(err, lot) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        getAverages(lot._id,'',function(minimumPrice,averageRating){
          lot.minimumPrice = minimumPrice;
          lot.averageRating = averageRating;
          res.json(lot);
        }, res);
      }
    });
*/
  },
  showAllLots: function(req,res) {
    getAverages("","",function(lots){

      res.json(lots);
    }, res)
    /*
    Lot.find({}, function(err, lots) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(lots);
      }
    });
*/
  },
  create: function(req, res) {
    Lot.create(req.body, function(err, lot) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(lot);
      }
    });
  },
  update: function(req, res) {
    var newLot = {};
    _.each(req.body, function(value, key){
      if(key != "__v" && key != "_id"){
        newLot[key] = value;
      }
    });

    Lot.findByIdAndUpdate(req.params.lid, newLot, function(err){
      if(err){
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  },
  destroy: function(req, res) {
    Spot.find({lot_id: req.params.lid}, function(err, spots){
      _.each(spots, function(spot){
        Spot.remove({_id: spot._id}, function(err){
        });
      });
      Lot.remove({_id: req.params.lid}, function(err) {
        if (err) {
          res.status(500).json({err: 'internal error'});
        } else {
          res.json({msg:'success'});
        }
      });
    });
  }
};
