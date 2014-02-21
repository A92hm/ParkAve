var mongoose = require('mongoose'),
    _ = require('underscore'),
    User = require('./models/user').User;

mongoose.connect('mongodb://54.84.154.254/parking');  // Production
//mongoose.connect('mongodb://localhost/dummydb');
var db = mongoose.connection;

db.on('error', function(msg) {
  console.log('Mongoose connection error %s', msg);
});

db.once('open', function() {
  console.log('Mongoose connection established');
  populateDB();
});

// in case the above does not work:
/*
mongoose.connect('mongodb://localhost/blog', function(server, err) {
  if (err) {
    conosole.log('error starting db', err);
  } else {
    console.log('connected to db');
  }
});
*/

function populateDB() {
  var users = [
    {
      name: "Joe Plumber",
      email: "joeplumber@america.com",
      password: "password",
      birthdate: "1981-01-20",
      phone: "(555) 555-5555"
    }
  ];

  _.each(users, function(user, index) {
    User.create(user, function(err, user) {
      if (err) {
        console.log('unable to create user');
      } else {
        console.log('created user');
      }
    });
  });
}