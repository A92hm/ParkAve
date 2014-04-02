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

    initialize:function () {
      var s3Model = new S3Model();
      var collection = new S3Collection([s3Model]);
      var test = s3Model.fetch();
      console.log('test');
      console.log(test);
      this.collection.fetch({
        error:function(){
          console.log(error);
        }
      });
      this.render();
    },

    render: function() {
      this.$el.html( this.template({test:this.test}));
      return this;
    },

    uploadFileToS3 : function (){
    }

  });

  return ImageUploaderView;
});
