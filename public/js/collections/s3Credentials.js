define(['underscore','backbone', 'models/s3Credential'], function(_, Backbone, S3Credential) {
  var S3Collection = Backbone.Collection.extend({
    model: S3Credential,
    url: '/api/sign_s3'
  });
  return S3Collection;
});
