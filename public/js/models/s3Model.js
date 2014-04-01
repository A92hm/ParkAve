define(['underscore','backbone'], function(_, Backbone) {

  var S3Model = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
    	policy: '',
        signature: '',
        key: '',
        success_action_redirect: '',
        contentType: ''
    },
    initialize: function() {
    }
  });

  return S3Model;
});