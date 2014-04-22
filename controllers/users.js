var User = require('./../models/user').User,
    _ = require('underscore'),
    bcrypt = require('bcrypt'),
    Review = require('./../models/review').Review;


function getEncryptedPassword(password, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      callback(hash);
    });
  });
}

//returns false for an error
function getAverageRating(userID, callback){
  var total = 0;
  var count = 0;
  //all users
  if(userID == ""){
    var newUsers = [];
    var count = 0;
    User.find({}, function(err, users) {
      if (err) {
        console.log('error: '+ err);
        callback(-1);
        return;
      }else {
        var numOfUsers = users.length;
        if(numOfUsers == 0){
          callback(false);
        }
        _.each(users, function(user){
          user.name = 'dave';
          //recursivly call to set average for each user
          getAverageRating(user._id, function(average){
            //set average for each one using this method
            user.averageRating = average;
            newUsers[count] = user;
            count++;
            //need to do this within the callback
            if(count == numOfUsers-1){
              callback(newUsers);
            }
          });
          
        });
        console.log('newUsers: \n'+newUsers + '-----------');
        
      }
    });
  }
  else{
    Review.find({reviewee_id: userID}, function(err, reviews) {
      if (err) {
        console.log("error: "+err);
        callback(-2);
      } else {
         count = 0;
         total = 0;
        _.each(reviews, function(review){
          total = total + review.stars;
          count = count + 1;
        });
        if(count > 0)
          callback(total/count);
        else
          callback(-1);       
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
        //Needs to be fixed
        /*
        getAverageRating("",function(users){
          if(users){
            
            res.json(users);
          }
          else
            res.status(500).json({err: 'internal error'});
        });
        */
      }
    });
    //res.json(theUsers);
  },
  show: function(req, res) {
    console.log('users show');
    var user_id = req.params.uid;
    //check to make sure the session is valid
    if(!req.session.user){
      res.status(500).json({err: 'incorrect user error'});
      return;
    }
    else if(req.session.user == -1){
      //user has been logged out
      res.json({});
      return;
    }
    console.log("body: "+req.session.user.email);
    if(req.params.uid == 'session')
      user_id = req.session.user._id;
    getAverageRating(user_id, function(average){
      User.findById(user_id, function(err, user) {
      if (err || average == -2) {
        res.status(500).json({err: 'internal average error'});
      }else if(user) {
        user.password = undefined;
        user.averageRating = average
        console.log(user.averageRating);

        res.json(user);
      }
      else{
        res.json({});
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
              console.log('error: '+err);
              res.status(500).json({err: 'internal error'});
            } else {
              console.log('creating user');
              getAverageRating(user._id, function(average){
                user.averageRating = average;
                req.session.user = user;
                res.json(user);
              });
            }
          });
        });
      }else{
        res.json({err: 'emailexists'});        
      }
    });
  },
  update: function(req, res, socket) {
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
            newUser._id = req.params.uid;
            socket.emit('updatedUser', newUser);
            res.json({msg:'success'});
          }
        });
      });
    }else{
      User.findByIdAndUpdate(req.params.uid, newUser, function(err){
        if(err){
          res.status(500).json({err: 'internal error'});
        } else { 
          newUser._id = req.params.uid;
          socket.emit('updatedUser', newUser);
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
    console.log('Login attempt');
    //logout a user
    // Should be another way also remove the cookies
    if(req.body.email == 'logout' && req.body.password){
      req.session.user = -1;
      res.json({err: 'logged out'});
    }


    User.findOne({email: req.body.email}, function(err, user){
      if(err){
        res.status(500).json({err: 'internal error'});
      }else if(user){
        // bcrypt.compare(req.body.password, user.password, function(err1, resp) {
        //   if(err1){
        //     res.status(500).json({err: 'internal error'});
        //   }
          // if (resp){
            //!!!!!!TODO!!!!!!
            //get the average rating
            req.session.user = user;
            // hide for later
            // if (!user.creditCard){
            //   user.creditCard = 'XXX';
            // }
            // user.password = 'undefined';
            res.json(user);
          // } else {
            // res.status(421).json({err: 'not match'});
        //   }
        // });
      }else{
        res.status(407).json({err: 'not found'});
      }
    });
  },

  getName: function(req, res) {
    var user_id = req.params.uid;
    console.log('user getName');
    User.findById(user_id, function(err, user) {
      if (err) {
        res.status(500).json({err: 'internal average error'});
      }else if(user) {
        res.json({firstName: user.firstName, lastName: user.lastName});
      }
      else{
        res.json({});
      }
    });
  }
};




