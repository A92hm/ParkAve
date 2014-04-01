define(['underscore','backbone', 'models/s3Model'], function(_, Backbone, S3Model) {
  var S3Collection = Backbone.Collection.extend({
    model: S3Model,
    url: '/api/s3/signed',
    clienturl: function() {
      return this.url.slice(6);
    }
  });
  return S3Collection;
});
