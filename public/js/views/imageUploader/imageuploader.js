define(['jquery', 'underscore', 'backbone', 'text!templates/imageUploader/imageuploader.html',
        'models/user', 'models/session', 'collections/users',
        'collections/sessions', 'routing/router', 'models/s3Model', 'collections/s3Collection'],
  function($, _, Backbone, Template, User, Session, UsersCollection, SessionsCollection, Router, 
    S3Model,S3Collection) {

  var ImageUploaderView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),
    events: {
      'change #direct-upload-s3' : 'uploadFileToS3'
    },

    initialize: function(options) {
      //var s3Model = new S3Model();
      //var credentials = new S3Collection();
      //var data = credentials.toJSON();
      this.aws_key = options.aws_key;
    },

    render: function() {
      this.$el.html( this.template({aws_key: this.aws_key}));
      return this;
    },

    uploadFileToS3 : function (){
    }

  });

  return ImageUploaderView;
});
