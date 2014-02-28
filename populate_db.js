var mongoose = require('mongoose'),
    _ = require('underscore'),
    User = require('./models/user').User,
    Review = require('./models/review').Review,
    Car = require('./models/car').Car;

//mongoose.connect('mongodb://54.84.154.254/parking');  // Production
mongoose.connect('mongodb://localhost/parking');
var db = mongoose.connection;

db.on('error', function(msg) {
  console.log('Mongoose connection error %s', msg);
});

db.once('open', function() {
  console.log('Mongoose connection established');
  // populateDB();
  getDB();
});


function getDB()
{
  console.log('Inside getDB');
  User.find({}, function(err, users) {

    _.each(users, function(user){
      console.log(user)
    });

  });
}
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
      firstName: "Joe Plumber",
      lastName: "Joe Plumber",
      email: "joeplumber@america.com",
      password: "password",
      birthdate: "1981-01-20",
      phone: "(555) 555-5555"
      //id: 530d6db9614f81a34047f5f0
    },
    {
      firstName: "Jack Footballfan",
      lastName: "Joe Plumber",
      email: "jackfb@america.com",
      password: "password",
      birthdate: "1990-11-20",
      phone: "(555) 555-5555"
      //id: 530d6db9614f81a34047f5f1
    },
    {
      firstName: "Marge Wellington",
      lastName: "Marge Wellington",
      email: "marWell@america.com",
      password: "password",
      birthdate: "1990-11-20",
      phone: "(555) 555-5555"
      //id: 530d6db9614f81a34047f5f2
    },
    {
      firstName: "Kate Smith",
      lastName: "Kate Smith",
      email: "ksmith@america.com",
      password: "password",
      birthdate: "1990-11-20",
      phone: "(555) 555-5555"
      //id: 530d6db9614f81a34047f5f3
    },
    {
      firstName: "Joe Plumber",
      lastName: "Barb Johnson",
      email: "bjohn@america.com",
      password: "password",
      birthdate: "1990-11-20",
      phone: "(555) 555-5555"
      //id: 530d6db9614f81a34047f5f4
    },
    {
      firstName: "Joe Plumber",
      lastName: "Jason Carder",
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
      reviewer_id: "530d6db9614f81a34047f5f5",
      reviewee_id: "530d6db9614f81a34047f5f4",
      body: "worst place ever, she sold my spot...",
     
    },
    {
      title: "not that great",
      stars: 2,
      reviewer_id: "530d6db9614f81a34047f5f3",
      reviewee_id: "530d6db9614f81a34047f5f4",
      body: "she smells bad",
    },
    {
      title: "She is my hero",
      stars: 5,
      reviewer_id: "530d6db9614f81a34047f5f1",
      reviewee_id: "530d6db9614f81a34047f5f4",
      body: "really reliable, great service",
    },
    {
      title: "Good but..",
      stars: 4,
      reviewer_id: "530d6db9614f81a34047f5f0",
      reviewee_id: "530d6db9614f81a34047f5f4",
      body: "the lady's friend was mean",
    },
    {
      title: "He accused me of something that d_idn't happen",
      stars: 1,
      reviewer_id: "530d6db9614f81a34047f5f4",
      reviewee_id: "530d6db9614f81a34047f5f5",
      body: "left a bad review on my profile",
    },
  ];
  var cars = [
    {
      make: 'ford',
      model: 'f150',
      year: '2004',
      plate: '6T772H9',
      state: 'OK',
      color: 'blue',
      user_id: '530d6db9614f81a34047f5f5'
    },
    {
      make: 'ford',
      model: 'fusion',
      year: '2008',
      plate: '976H2H7',
      state: 'OK',
      color: 'blue',
      user_id: '530d6db9614f81a34047f5f4'
    },
    {
      make: 'toyoda',
      model: 'prius',
      year: '2011',
      plate: '6TFU02H9',
      state: 'TX',
      color: 'green',
      user_id: '530d6db9614f81a34047f5f3'
    },
    {
      make: 'dodge',
      model: '',
      year: '2014',
      plate: '6T0H5S',
      state: 'CA',
      color: 'red',
      user_id: '530d6db9614f81a34047f5f2'
    },
    {
      make: 'acura',
      model: 'rl',
      year: '2013',
      plate: '6G58JT9',
      state: 'NY',
      color: 'black',
      user_id: '530d6db9614f81a34047f5f1'
    },
    {
      make: 'honda',
      model: 'civic',
      year: '2009',
      plate: '76HHE2Y',
      state: 'AK',
      color: 'grey',
      user_id: '530d6db9614f81a34047f5f0'
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
/*
   _.each(reviews, function(review, index) {
    Review.create(review, function(err, review) {
      if (err) {
        console.log('unable to create review');
      } else {
        console.log('created review');
      }
    });
  });
*/
   _.each(cars, function(car, index) {
    Car.create(car, function(err, car) {
      if (err) {
        console.log('unable to create car');
      } else {
        console.log('created car');
      }
    });
  });


}