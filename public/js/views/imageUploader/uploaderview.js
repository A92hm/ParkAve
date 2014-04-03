define(['jquery', 'underscore', 'backbone', 'text!templates/imageUploader/uploaderview.html', 
  'utility/s3upload', 'models/s3Credential', 'collections/s3Credentials'],
  function($, _, Backbone, Template, S3Upload, S3Model, S3Collection) {

  var UploaderView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),
    //url : '/api/sign_s3',
    events: {
      'change #files' : 'uploadFileToS3'
    },

    initialize:function () {
      /*this.s3Model = new S3Model();
      this.collection = new S3Collection([this.s3Model]);
      console.log('test');
      var theView = this;
      this.collection.fetch({
        error:function(){
          console.log(error);
        },
        success:function(){
          console.log('success!');
          theView.render();
        }
      });
      this.listenTo(this.collection, 'change', this.render);*/
      this.var0 = 'helo'
      this.render();
    },

    render: function() {
      /*
      if (this.collection.length > 0) {
        this.s3Model = this.collection.at(0);
      }
      console.log('aws: '+this.s3Model.get('url'));
      */
      this.$el.html( this.template());
      return this;
    },

    uploadFileToS3 : function (){
      this.var1 = this.var0;
      console.log(this.var1);
      var s3upload = new S3Upload({
        file_dom_selector: '#files',
        s3_sign_put_url: '/api/sign_s3',
        onProgress: function(percent, message) {
            this.$el.find('#status').html('Upload progress: ' + percent + '% ' + message);
            console.log('Upload progress: ' + percent + '% ' + message);
        },
        onFinishS3Put: function(public_url) {
            this.$el.find('#status').html('Upload completed. Uploaded to: '+ public_url);
            this.$el.find('#avatar_url').val(public_url);
            this.$el.find('#preview').html('<img src="'+public_url+'" style="width:300px;" />');
            console.log('Upload completed. Uploaded to: '+ public_url);
        },
        onError: function(status) {
            $this.$el.find('#status').html('Upload error: ' + status);
            console.log('Upload error: ' + status);
        }
      });
      console.log(this.var1);
      console.log(s3upload);
      return s3upload;
    }
  });
  return UploaderView;
});
