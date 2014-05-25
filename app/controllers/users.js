var mongoose = require('mongoose'),
  User = mongoose.model('User');
 


module.exports = function(io){


	dic = {
		test : function(req, res) {
		console.log(io);
		}
	};

	return dic;
};


