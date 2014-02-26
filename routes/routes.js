var path = require('path'),
    usersController = require('./../controllers/users');

// Require your controllers here
// Example: var postsController = require('./../controllers/posts.js');  
var lotsController = require('./../controllers/lots.js');
var reviewsController = require('./../controllers/reviews.js');
var carsController = require('./../controllers/cars.js');
function sendIndexFile(res){
  res.sendfile(path.join(__dirname, '..', 'public', 'index.html'));
}

module.exports = {
  init: function(app) {
    app.get('/heartbeat', function(req, res) {
      res.send("it's alive! it's alive!!")
    });

    // API Routes go here
    // Example
    // app.get(  '/api/posts',     postsController.index);
    // app.get(  '/api/posts/:id', postsController.show);
    // app.post( '/api/posts',     postsController.create);
    // app.put(  '/api/posts/:id', postsController.update);
    // app.del(  '/api/posts/:id', postsController.destroy);
    app.get(  '/api', function(req, res){ res.send("working"); });
    
    app.get(  '/api/users',     usersController.index);
    app.get(  '/api/users/:uid', usersController.show);
    app.post( '/api/users',     usersController.create);
    app.put(  '/api/users/:uid', usersController.update);
    app.del(  '/api/users/:uid', usersController.destroy);

    app.post( '/api/users/session', usersController.session);  // Used to validate email/password combinations

    app.get(  '/api/users/:uid/reviews', reviewsController.index);
    app.get(  '/api/users/:uid/reviews/:rid', reviewsController.show);
    app.post( '/api/users/:uid/reviews', reviewsController.create);
    app.put(  '/api/users/:uid/reviews/:rid', reviewsController.update);
    app.del(  '/api/users/:uid/reviews/:rid', reviewsController.destroy);


    //cars
    app.get(  '/api/users/:uid/cars', carsController.index);
    app.get(  '/api/users/:uid/cars/:cid', carsController.show);
    app.post( '/api/users/:uid/cars', carsController.create);
    app.put(  '/api/users/:uid/cars/:cid', carsController.update);
    app.del(  '/api/users/:uid/cars/:cid', carsController.destroy);

    
    app.get(  '/api/lots',     lotsController.index);
    app.get(  '/api/lots/:id', lotsController.show);
    app.post( '/api/lots',     lotsController.create);
    app.put(  '/api/lots/:id', lotsController.update);
    app.del(  '/api/lots/:id', lotsController.destroy);

    // Non-API routes

    app.get(  '/landing*', function(req, res) {
      sendIndexFile(res);
    });
    app.get(  '/users*', function(req, res) {
      sendIndexFile(res);
    });
    app.get(  '/getstarted*', function(req, res) {
      sendIndexFile(res);
    });
    app.get(  '/lots*', function(req, res) {
      res.sendfile(path.join(__dirname, '..', 'public', 'index.html'));
    });

  }
};
