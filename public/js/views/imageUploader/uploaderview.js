define(['jquery', 'underscore', 'backbone', 'text!templates/imageUploader/uploaderview.html'],
  function($, _, Backbone, Template) {

  var UploaderView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),
    events: {
      'change #files' : 'uploadFileToS3'
    },

    initialize:function () {
       (function() {

        window.S3Upload = (function() {

          S3Upload.prototype.s3_sign_put_url = '/signS3put';

          S3Upload.prototype.file_dom_selector = '#file_upload';

          S3Upload.prototype.onFinishS3Put = function(public_url, file) {
            return console.log('base.onFinishS3Put()', public_url, file);
          };

          S3Upload.prototype.onProgress = function(percent, status, public_url, file) {
            return console.log('base.onProgress()', percent, status, public_url, file);
          };

          S3Upload.prototype.onError = function(status, file) {
            return console.log('base.onError()', status, file);
          };

          function S3Upload(options) {
            if (options == null) {
              options = {};
            }
            _.extend(this, options);
            if (this.file_dom_selector) {
              this.handleFileSelect($(this.file_dom_selector).get(0));
            }
          }

          S3Upload.prototype.handleFileSelect = function(file_element) {
            console.log('handleFileSelect');
            var f, files, output, _i, _len, _results;
            this.onProgress(0, 'Upload started.');
            files = file_element.files;
            output = [];
            _results = [];
            for (_i = 0, _len = files.length; _i < _len; _i++) {
              f = files[_i];
              _results.push(this.uploadFile(f));
            }
            return _results;
          };

          S3Upload.prototype.createCORSRequest = function(method, url) {
            console.log('createCORSRequest');
            var xhr;
            xhr = new XMLHttpRequest();
            if (xhr.withCredentials != null) {
              xhr.open(method, url, true);
            } else if (typeof XDomainRequest !== "undefined") {
              xhr = new XDomainRequest();
              xhr.open(method, url);
            } else {
              xhr = null;
            }
            return xhr;
          };

          S3Upload.prototype.executeOnSignedUrl = function(file, callback, opts) {
            console.log('executeOnSignedUrl');
            var name, this_s3upload, type, xhr;
            this_s3upload = this;
            xhr = new XMLHttpRequest();
            type = opts && opts.type || file.type;
            name = opts && opts.name || file.name;
            xhr.open('GET', this.s3_sign_put_url + '?s3_object_type=' + type + '&s3_object_name=' + encodeURIComponent(name), true);
            xhr.onreadystatechange = function(e) {
              var result;
              if (this.readyState === 4 && this.status === 200) {
                try {
                  result = JSON.parse(this.responseText);
                } catch (error) {
                  this_s3upload.onError('Signing server returned some ugly/empty JSON: "' + this.responseText + '"');
                  return false;
                }
                return callback(result.signed_request, result.url);
              } else if (this.readyState === 4 && this.status !== 200) {
                return this_s3upload.onError('Could not contact request signing server. Status = ' + this.status);
              }
            };
            return xhr.send();
          };

          S3Upload.prototype.uploadToS3 = function(file, url, public_url, opts) {
            console.log('uploadToS3');
            var this_s3upload, type, xhr;
            this_s3upload = this;
            type = opts && opts.type || file.type;
            xhr = this.createCORSRequest('PUT', url);
            if (!xhr) {
              this.onError('CORS not supported');
            } else {
              xhr.onload = function() {
                if (xhr.status === 200) {
                  this_s3upload.onProgress(100, 'Upload completed.', public_url, file);
                  return this_s3upload.onFinishS3Put(public_url, file);
                } else {
                  return this_s3upload.onError('Upload error: ' + xhr.status, file);
                }
              };
              xhr.onerror = function() {
                return this_s3upload.onError('XHR error.', file);
              };
              xhr.upload.onprogress = function(e) {
                var percentLoaded;
                if (e.lengthComputable) {
                  percentLoaded = Math.round((e.loaded / e.total) * 100);
                  return this_s3upload.onProgress(percentLoaded, (percentLoaded === 100 ? 'Finalizing.' : 'Uploading.'), public_url, file);
                }
              };
            }
            xhr.setRequestHeader('Content-Type', type);
            xhr.setRequestHeader('x-amz-acl', 'public-read');
            return xhr.send(file);
          };

          S3Upload.prototype.validate = function(file) {
            return null;
          };

          S3Upload.prototype.uploadFile = function(file, opts) {
             console.log('uploadFile');
            var error, this_s3upload;
            error = this.validate(file);
            if (error) {
              this.onError(error, file);
              return null;
            }
            this_s3upload = this;
            return this.executeOnSignedUrl(file, function(signedURL, publicURL) {
              return this_s3upload.uploadToS3(file, signedURL, publicURL, opts);
            }, opts);
          };

          return S3Upload;

        })();

      }).call(this);

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
     

      console.log('Inside upload File');

      var s3upload = new S3Upload({
        file_dom_selector: this.$el.find('#files'),
        s3_sign_put_url: '/api/sign_s3',
        onProgress: function(percent, message) {

            // this.$el.find('#status').html('Upload progress: ' + percent + '% ' + message);
            console.log('Upload progress: ' + percent + '% ' + message);
        },
        onFinishS3Put: function(public_url) {
            // this.$el.find('#status').html('Upload completed. Uploaded to: '+ public_url);
            // this.$el.find('#avatar_url').val(public_url);
            // this.$el.find('#preview').html('<img src="'+public_url+'" style="width:300px;" />');
            console.log('Upload completed. Uploaded to: '+ public_url);
        },
        onError: function(status) {
            // $this.$el.find('#status').html('Upload error: ' + status);
            console.log('Upload error: ' + status);
        }
      });
      console.log(s3upload);
    }
  });
  return UploaderView;
});
