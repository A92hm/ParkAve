define(['jquery', 'underscore', 'backbone', 'text!templates/imageUploader/uploaderview.html', 
  'utility/s3upload'],
  function($, _, Backbone, Template, S3Upload) {

  var UploaderView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
      'change #files' : 'uploadFileToS3'
    },

    initialize:function () {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    uploadFileToS3 : function (){
      var s3upload = new S3Upload({
        file_dom_selector: this.$el.find('#files'),
        s3_sign_put_url: '/api/sign_s3',
        onProgress: function(percent, message) {
            this.$el.find('#status').html('Upload progress: ' + percent + '% ' + message);
        },
        onFinishS3Put: function(public_url) {
            this.$el.find('#status').html('Upload completed. Uploaded to: '+ public_url);
            this.$el.find('#avatar_url').val(public_url);
            this.$el.find('#preview').html('<img src="'+public_url+'" style="width:300px;" />');
        },
        onError: function(status) {
            $this.$el.find('#status').html('Upload error: ' + status);
        }
      });
      console.log('test');
    }
  });
  return UploaderView;
});
