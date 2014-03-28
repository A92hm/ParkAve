define(['jquery', 'underscore', 'backbone', 'text!templates/user/imageuploader.html',
        'models/user', 'models/session', 'collections/users',
        'collections/sessions', 'routing/router', 'assets/imageuploader/javascripts/jquery/ui.widget',
        'assets/imageuploader/javascripts/jquery/fileupload', 'assets/imageuploader/javascripts/jquery/app', 
        'collections/s3Collection'],
  function($, _, Backbone, Template, User, Session, UsersCollection, SessionsCollection, Router, 
    Widget, FileUploader, S3Uploader, S3Collection) {

  var ImageUploaderView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),
    events: {
      'change #direct-upload-s3' : 'uploadFileToS3'
    },

    initialize: function(options) {
      
    },

    render: function() {
      this.$el.html( this.template());
      return this;
    },

    uploadFileToS3 : function (options){
      var frm = document.getElementById('direct-upload-s3') || null;
      if(frm) {
        frm.action = 'http://{{ aws_bucket }}.{{ host }}';
      } 
      document.getElementById('aws_id').value = '{{ aws_key }}';
      var widget = new Widget();
      var uploader = new FileUploader();
      var s3Uploader = new S3Uploader();
    }

  });

  return ImageUploaderView;
});
