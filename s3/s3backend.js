var crypto = require('crypto'),
    config = require('./../s3/config');

var AWS_ACCESS_KEY = config.aws_key;
var AWS_SECRET_KEY = config.aws_secret;
var S3_BUCKET = config.aws_bucket;

module.exports = {
	signed: function(req, res){
	    var object_name = req.query.s3_object_name;
	    var mime_type = req.query.s3_object_type;

	    var now = new Date();
	    var expires = Math.ceil((now.getTime() + 10000)/1000); // 10 seconds from now
	    var amz_headers = "x-amz-acl:public-read";  

	    var put_request = "PUT\n\n"+mime_type+"\n"+expires+"\n"+amz_headers+"\n/"+S3_BUCKET+"/"+object_name;

	    var signature = crypto.createHmac('sha1', AWS_SECRET_KEY).update(put_request).digest('base64');
	    signature = encodeURIComponent(signature.trim());
	    signature = signature.replace('%2B','+');

	    var url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+object_name;

	    var credentials = {
	        signed_request: url+"?AWSAccessKeyId="+AWS_ACCESS_KEY+"&Expires="+expires+"&Signature="+signature,
	        url: url
	    };
	    res.write(JSON.stringify(credentials));
	    res.end();
	}
};

