var mongoose = require('mongoose'),
    _ = require('underscore'),
    User = require('./models/user').User,
    Review = require('./models/review').Review;

//mongoose.connect('mongodb://54.84.154.254/parking');  // Production
mongoose.connect('mongodb://localhost/dummydb');
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
      //id: 530d6db9614f81a34047f5f0
    },
    {
      name: "Jack Footballfan",
      email: "jackfb@america.com",
      password: "password",
      birthdate: "1990-11-20",
      phone: "(555) 555-5555"
      //id: 530d6db9614f81a34047f5f1
    },
    {
      name: "Marge Wellington",
      email: "marWell@america.com",
      password: "password",
      birthdate: "1990-11-20",
      phone: "(555) 555-5555"
      //id: 530d6db9614f81a34047f5f2
    },
    {
      name: "Kate Smith",
      email: "ksmith@america.com",
      password: "password",
      birthdate: "1990-11-20",
      phone: "(555) 555-5555"
      //id: 530d6db9614f81a34047f5f3
    },
    {
      name: "Barb Johnson",
      email: "bjohn@america.com",
      password: "password",
      birthdate: "1990-11-20",
      phone: "(555) 555-5555"
      //id: 530d6db9614f81a34047f5f4
    },
    {
      name: "Jason Carder",
      email: "jcarter@america.com",
      password: "password",
      birthdate: "1990-11-20",
      phone: "(555) 555-5555"
      //id: 530d6db9614f81a34047f5f5
    }
  ];
  
  
  var reviews = [
    {
      title: "I hate this guy",
      stars: 1,
      reviewerID: "530d6db9614f81a34047f5f5",
      revieweeID: "530d6db9614f81a34047f5f4",
      body: "worst place ever, she sold my spot...",
     
    },
    {
      title: "not that great",
      stars: 2,
      reviewerID: "530d6db9614f81a34047f5f3",
      revieweeID: "530d6db9614f81a34047f5f4",
      body: "she smells bad",
    },
    {
      title: "She is my hero",
      stars: 5,
      reviewerID: "530d6db9614f81a34047f5f1",
      revieweeID: "530d6db9614f81a34047f5f4",
      body: "really reliable, great service",
    },
    {
      title: "Good but..",
      stars: 4,
      reviewerID: "530d6db9614f81a34047f5f0",
      revieweeID: "530d6db9614f81a34047f5f4",
      body: "the lady's friend was mean",
    },
    {
      title: "He accused me of something that didn't happen",
      stars: 1,
      reviewerID: "530d6db9614f81a34047f5f4",
      revieweeID: "530d6db9614f81a34047f5f5",
      body: "left a bad review on my profile",
    },
  ];
  /*
  _.each(users, function(user, index) {
    User.create(user, function(err, user) {
      if (err) {
        console.log('unable to create user');
      } else {
        console.log('created user');
      }
    });
  });*/
   _.each(reviews, function(review, index) {
    Review.create(review, function(err, review) {
      if (err) {
        console.log('unable to create review');
      } else {
        console.log('created review');
      }
    });
  });


}