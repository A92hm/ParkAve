define(['underscore','backbone'], function(_, Backbone) {
  var S3Model = Backbone.Model.extend({
    defaults: {
      aws_bucket: '',
      aws_key: '',
      redirect_host: '',
      bucket_dir: '',
      host: '',
    	policy: '',
      signature: '',
      key: '',
      success_action_redirect: '',
      contentType: ''
    },
    parse:function (response) {
      response.id = response._id;
      return response;
    }
  });
  return S3Model;
});