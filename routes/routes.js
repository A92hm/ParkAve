var path = require('path'),
    usersController = require('./../controllers/users'),
    lotsController = require('./../controllers/lots.js'),
    spotsController = require('./../controllers/spots.js'),
    reviewsController = require('./../controllers/reviews.js'),
    carsController = require('./../controllers/cars.js'),
    feedbackController = require('./../controllers/feedbacks.js');

// function sendIndexFile(res){
//   res.sendfile(path.join(__dirname, '..', 'public', 'index.html'));
// }

module.exports = {
  init: function(app) {
    app.get('/heartbeat', function(req, res) {
      res.send("it's alive! it's alive!!")
    });

    // API Routes go here
    app.get(  '/api', function(req, res){ res.send("working"); });
    
    app.get(  '/api/users',     usersController.index);     // get all users
    app.get(  '/api/users/:uid', usersController.show);     // get the user with the given id
    app.post( '/api/users',     usersController.create);    // create a user
    app.put(  '/api/users/:uid', usersController.update);   // update the user for the given id
    app.del(  '/api/users/:uid', usersController.destroy);  // delete the user with id <:uid> from the database

    app.post( '/api/users/session', usersController.session);  // used to validate email/password combinations -- give it an email and password

    //reviews
    app.get(  '/api/reviews', reviewsController.showAll);                    //show all of the reviews
    app.get(  '/api/users/:uid/reviews', reviewsController.index);           // get all reviews for the user the given id
    app.get(  '/api/users/:uid/reviews/:rid', reviewsController.show);       // get a specific review for the given user and review ids 
    app.post( '/api/users/:uid/reviews', reviewsController.create);          // create a review in the database for the user with the given uid
    app.put(  '/api/users/:uid/reviews/:rid', reviewsController.update);     // update the specific review for the given user and review ids
    app.del(  '/api/users/:uid/reviews/:rid', reviewsController.destroy);    // delete the specific review for the given user and review ids

    //cars
    app.get(  '/api/users/:uid/cars', carsController.index);          // get all cars for a given user id
    app.get(  '/api/users/:uid/cars/:cid', carsController.show);      // get a specific car for the given user and car ids 
    app.post( '/api/users/:uid/cars', carsController.create);         // create a car in the database for the user with the given uid
    app.put(  '/api/users/:uid/cars/:cid', carsController.update);    // update the specific car for the given user and car ids
    app.del(  '/api/users/:uid/cars/:cid', carsController.destroy);   // delete the specific car for the given user and car ids

    // Lots
    app.get(  '/api/users/:uid/lots',     lotsController.index);        // Get all of the lots for a specified user id
    app.get(  '/api/users/:uid/lots/:lid', lotsController.show);        // Get a specific lot for a specified user id
    app.post( '/api/users/:uid/lots',     lotsController.create);       // Create a lot in the database for a specified user id
    app.put(  '/api/users/:uid/lots/:lid', lotsController.update);      // Update the specific lot for a specified user id and lot id
    app.del(  '/api/users/:uid/lots/:lid', lotsController.destroy);     // Delete the specific lot for a specified user id and lot id
    
    app.get(  '/api/lots',      lotsController.showAllLots);            // Get all of the lots
    app.get(  '/api/lots/:lid', lotsController.show);                   // Get a specific lot for a specified lot id
    app.del(  '/api/lots/:lid', lotsController.destroy);                // Delete the specific lot for a specified lot id

    // Spots
    app.get(  '/api/users/:uid/lots/:lid/spots', spotsController.index);        // Get all of the spots for a specific lot id and user id
    app.get(  '/api/users/:uid/lots/:lid/spots/:sid', spotsController.show);    // Get a specific spot for a specific lot and user id
    app.post( '/api/users/:uid/lots/:lid/spots', spotsController.create);       // Create a spot in the database for a specific lot id
    app.put(  '/api/users/:uid/lots/:lid/spots/:sid', spotsController.update);  // Update a specific spot give a specified spot, lot, and user id
    app.del(  '/api/users/:uid/lots/:lid/spots/:sid', spotsController.destroy); // Delete the speceific spot from the database

    // API for feedback
    app.get(  '/api/feedback',     feedbackController.index);     // get all feedback
    app.get(  '/api/feedback/:fid', feedbackController.show);     // get the feedback with the given id
    app.post( '/api/feedback',     feedbackController.create);    // create a user
    app.put(  '/api/feedback/:fid', feedbackController.update);   // update the feedback for the given id
    app.del(  '/api/feedback/:fid', feedbackController.destroy);  // delete the feedback with id <:fid> from the database

    // API for closest lots
    // Call to get the nearest lots within a given distance :json is in the form lat+lon+distance
    app.get(  '/api/location/:json', lotsController.nearbyLots);        // Get all of the lots for a specified user id
    app.get(  '/api/location/all/:json', lotsController.nearbyLotsAndSpots);        // Get all of the lots for a specified user id

    // API for buying spots
    app.post( '/api/purchase', spotsController.purchaseSpot);

    // Non-API routes

    // app.get(  '/landing*', function(req, res) {
    //   sendIndexFile(res);
    // });
    // app.get(  '/login*', function(req, res) {
    //   sendIndexFile(res);
    // });
    // app.get(  '/buy*', function(req, res) {
    //   sendIndexFile(res);
    // });
    // app.get(  '/sell*', function(req, res) {
    //   sendIndexFile(res);
    // });
    // app.get(  '/users*', function(req, res) {
    //   sendIndexFile(res);
    // });
    // app.get(  '/getstarted*', function(req, res) {
    //   sendIndexFile(res);
    // });
    app.get(  '*', function(req, res) {
      res.sendfile(path.join(__dirname, '..', 'public', 'index.html'));
    });

  }
};
