$(function() {
  $('.direct-upload').each(function() {
    /* For each file selected, process and upload */
    var form = $(this)
    $(this).fileupload({
      url: form.attr('action'), // Grabs form's action src
      type: 'POST',
      autoUpload: true,
      dataType: 'xml', // S3's XML response
      add: function (event, data) {
        $.ajax({
          url: "/api/s3/signed",
          type: 'GET',
          dataType: 'json',
          data: {title: data.files[0].name}, // Send filename to /signed for the signed response 
          async: false,
          success: function(data) {
            // Now that we have our data, we update the form so it contains all
            // the needed data to sign the request
            form.find('input[name=key]').val(data.key);
            form.find('input[name=policy]').val(data.policy);
            form.find('input[name=signature]').val(data.signature);
            form.find('input[name=Content-Type]').val(data.contentType);
            console.log('data.key '+data.key);
            console.log('data.policy'+data.policy);
            console.log('data.signature'+data.signature);
            console.log('data.Content-Type'+data.contentType);
          }
        })
        data.submit();
      },
      send: function(e, data) {
        $('.progress').fadeIn(); // Display widget progress bar
      },
      progress: function(e, data){
        $('#circle').addClass('animate'); // Animate the rotating circle when in progress
        var percent = Math.round((e.loaded / e.total) * 100)
        $('.meter').css('width', percent + '%') // Update progress bar percentage
      },
      fail: function(e, data) {
        console.log('fail')
        $('#circle').removeClass('animate');
      },
      success: function(data) {
        var url = $(data).find('Location').text(); // Find location value from XML response
        $('.share-url').show(); // Show input
        $('.share-url').val(url.replace("%2F", "/")); // Update the input with url address 
        console.log('url '+url);
      },
      done: function (event, data) {
        // When upload is done, fade out progress bar and reset to 0
        $('.progress').fadeOut(300, function() {
          $('.bar').css('width', 0)
        })

        // Stop circle animation
        $('#circle').removeClass('animate');
      },
    })
  })

  var dragging = 0; //Get around chrome bug
  $(".share-url").focus(function () {
    // Select all text on #share-url focus

    "use strict";
    var $this = $(this);
    $this.select();

    // Work around Chrome's little problem
    $this.mouseup(function () {
        // Prevent further mouseup intervention
        $this.unbind("mouseup");
        return false;
  });
});
})