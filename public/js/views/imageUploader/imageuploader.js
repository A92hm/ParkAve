define(['jquery', 'underscore', 'backbone', 'text!templates/user/imageuploader.html',
        'models/user', 'models/session', 'collections/users',
        'collections/sessions', 'routing/router', 'collections/s3Collection'],
  function($, _, Backbone, Template, User, Session, UsersCollection, SessionsCollection, Router, 
    S3Collection) {

  var ImageUploaderView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),
    events: {
      'change #direct-upload-s3' : 'uploadFileToS3'
    },

    initialize: function(options) {
      this.credentials = options.credentials;
      
    },

    render: function() {
      this.$el.html( this.template());
      return this;
    },

    uploadFileToS3 : function (options){
      
    }

  });

  return ImageUploaderView;
});
