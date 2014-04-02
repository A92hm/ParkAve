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
      this.s3Model = new S3Model();
      this.collection = new S3Collection([this.s3Model]);
      //collection.fetch();
      //var test = collection.toJSON();
      console.log('test');
      //console.log(s3Model.fetch());
      var theView = this;
      this.collection.fetch({
        error:function(){
          console.log(error);
        },
        success:function(){
          console.log('success!');
          //console.log(this);
          theView.render();
        }
      });


      //this.render();
      this.listenTo(this.collection, 'change', this.render);
      //this.listenTo(this.user, 'destroy', this.remove);

    },

    render: function() {
      if (this.collection.length > 0) {
        this.s3Model = this.collection.at(0);
      }
      console.log('aws: '+this.s3Model.get('aws_bucket'));
      this.$el.html( this.template( this.s3Model.toJSON() ));
      return this;
    },

    uploadFileToS3 : function (){
      var host = this.s3Model.get('host');
      var bucket = this.s3Model.get('aws_bucket');
      var url = 'http://'+bucket+'.'+host;
      var form = this.$el.find('#direct-upload-s3') || null;
      if(form){
        form.action = url;
      }
      this.$el.find('#aws_id').value = this.s3Model.get('aws_key');
    }

  });

  return ImageUploaderView;
});
