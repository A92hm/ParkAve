var User = require('./../models/user').User,
    _ = require('underscore'),
    bcrypt = require('bcrypt');
var Review = require('./../models/review').Review;


function getEncryptedPassword(password, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      callback(hash);
    });
  });
}

function getAverageRating(userID, callback){
  var total = 0;
  var count = 0;
  //all users
  if(userID == ""){
    var users;
    var count = 0;
    User.find({}, function(err, users) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      }else {
        _.each(users, function(user){
          count++;
          //recursivly call to set average for each user
          getAverageRating(user._id, function(average){
            //set average for each one using this method
            user.averageRating = average;
            user[count] = user;
          });
        });
        callback(users);//nothing to send back
      }
    });
}
  else{
    Review.find({reviewee_id: userID}, function(err, reviews) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        _.each(reviews, function(review){
          console.log('stars: '+review.stars);
          total = total + review.stars;
          count = count + 1;
        });
        if(count > 0)
          callback(total/count);
        else
          callback(0);       
      }
    }); 
  }
}

module.exports = {
  index: function(req, res) {
    console.log('users index');
    var theUsers = {};
    var count = 0;

    User.find({}, function(err, users) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      }else {
        _.each(users, function(user){
          user.password = undefined;
        });
        res.json(users);
        
        
      }
    });
    //res.json(theUsers);
  },
  show: function(req, res) {
    console.log('users show');
    getAverageRating(req.params.uid, function(average){
      User.findById(req.params.uid, function(err, user) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      }else {
        user.password = undefined;
        user.averageRating = average
        console.log(user.averageRating);

        res.json(user);
      }
    });
    });
    
  },
  create: function(req, res) {
    console.log('users create', req.params, req.body);
    User.findOne({email: req.body.email}, function(err, user){
      if(!user){
        getEncryptedPassword(req.body.password, function(encryptedPassword){
          req.body.password = encryptedPassword;
          User.create(req.body, function(err, user) {
            if (err) {
              res.status(500).json({err: 'internal error'});
            } else {
              res.json(user);
            }
          });
        });
      }else{
        res.json({err: 'emailexists'});        
      }
    });
  },
  update: function(req, res) {
    console.log('users update', req.params, req.body);

    var newUser = {};
    _.each(req.body, function(value, key){
      if(key != "__v" && key != "_id" && key != "password"){
        newUser[key] = value;
      }
    });

    if(req.body.password){
      getEncryptedPassword(req.body.password, function(encryptedPassword){
        newUser.password = encryptedPassword;
        User.findByIdAndUpdate(req.params.uid, newUser, {}, function(err){
          if(err){
            res.status(500).json({err: 'internal error'});
          } else {
            res.json({msg:'success'});
          }
        });
      });
    }else{
      User.findByIdAndUpdate(req.params.uid, newUser, function(err){
        if(err){
          res.status(500).json({err: 'internal error'});
        } else {
          res.json({msg:'success'});
        }
      });
    }
  },
  destroy: function(req, res) {
    console.log('users destroy', req.params, req.body);
    User.remove( {_id: req.params.uid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      }else {
        res.json({msg:'success'});
      }
    });
  },
  session: function(req, res) {
    User.findOne({email: req.body.email}, function(err, user){
      if(err){
        res.status(500).json({err: 'internal error'});
      }else if(user){
        console.log(user);
        if(bcrypt.compareSync(req.body.password, user.password)){
          res.json(user);
        }
        res.json({err: 'nomatch'});
      }else{
        res.json({err: 'notfound'});
      }
    });
  }
};




