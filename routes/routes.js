var path = require('path'),
    usersController = require('./../controllers/users');

// Require your controllers here
// Example: var postsController = require('./../controllers/posts.js');  

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
    app.get(  '/account-setting*', function(req, res) {
      //res.sendfile(path.join(__dirname, '..', 'public', 'index.html'));
      sendIndexFile(res);
    });
  }
};
