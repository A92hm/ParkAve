
define(['jquery', 'underscore', 'backbone', 'text!templates/lot/listnew.html', 'text!templates/widgets/inputerror.html',],
  function($, _, Backbone, Template, InputErrorTemplate) {

  var NewLotView = Backbone.View.extend({
    tagName: 'div',
    className: 'modal fade',
    id: 'new-form-modal',
    template: _.template( Template ),

    events: {
      'click #new-lot-save': 'saveLot'
    },

    initialize: function() {
      
    },

    render: function() {
      this.$el.html( this.template() );
      return this;
    },

    saveLot: function(event) {
      // might validate the input here

      var inputTitle = this.$el.find('[name="input-title"]');
      var inputAddress1 = this.$el.find('[name="input-address"]');
      var inputAddress2 = this.$el.find('[name="input-address-2"]');
      var inputCity = this.$el.find('[name="input-city"]');
      var inputZip = this.$el.find('[name="input-zip"]');
      var inputState = this.$el.find('[name="input-state"]');


      this.lotAttributes = {
        title: inputTitle.val(),
        address1: inputAddress1.val(),
        address2: inputAddress2.val(),
        city: inputCity.val(),
        zip: inputZip.val(),
        state: inputState.val(),
        latitude: 120,
        longitude: 120
      };

      // Some input validation
      if (inputTitle.val() == '') {
        inputTitle.focus();
        return;
      } else if (this.lotAttributes.address1 == '') {
        inputAddress1.focus();
        return;
      } else if (this.lotAttributes.city == '') {
        inputCity.focus();
        return;
      } else if (this.lotAttributes.zip == '') {
        inputZip.focus();
        return;
      } else if (this.lotAttributes.state == '') {
        inputState.focus();
        return;
      }

      // Geocoding time!!
      var API_KEY = 'AIzaSyB1sgyCCyjydPDo6rFweWMbrDyU6uRxPGM';
      // The url for the geocoding.  The spaces need to be replaced with '+' for the url to work
      // Should do some error checking first.
      var geocodingAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + inputAddress1.val().split(' ').join('+') + ',+' + inputCity.val().split(' ').join('+')
        + ',+' + inputState.val().split(' ').join('+') + ',+' + inputZip.val().split(' ').join('+') + '&sensor=false&key=' + API_KEY;

      $.getJSON(geocodingAPI, function (json) {
        globalJson = json;
        // Address
        var address = json.results[0].formatted_address;
        console.log('Address: ', address);
       
        // Latitude
        var lat = json.results[0].geometry.location.lat;
        console.log('Latitude: ', lat);
        // this.lotAttributes.latitude = lat;
       
        // Longitude
        var lon = json.results[0].geometry.location.lng;
        console.log('Longitude: ', lon);
        // this.lotAttributes.longitude = lon;
      });

      // asynchronous call issue
      // this.lotAttributes.latitude = globalJson.results[0].geometry.location.lat;
      // this.lotAttributes.longitude = globalJson.results[0].geometry.location.lon;

      this.trigger('dialog:save');
    }
  });

  return NewLotView;

});