define(['underscore','backbone'], function(_, Backbone) {

  var S3Model = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
      
    },
    initialize: function() {
    }
  });

  return S3Model;
});