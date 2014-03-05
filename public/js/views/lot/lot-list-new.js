
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
        user_id: this.model.get('_id'),
        address: {
          address1: inputAddress1.val(),
          address2: inputAddress2.val(),
          city: inputCity.val(),
          zip: inputZip.val(),
          state: inputState.val()
        }
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

      var thisGuy = this;
      $.ajax({
        url: geocodingAPI,
        async: false,
        dataType: 'json',
        success: function (json) {
          if(json.status == "ZERO_RESULTS"){
            alert('invalid address');
          } else{
            thisGuy.lotAttributes.lat = '' + json.results[0].geometry.location.lat;
            thisGuy.lotAttributes.lon = '' + json.results[0].geometry.location.lng;

            thisGuy.trigger('dialog:save');
          }
        }
      });
    }
  });

  return NewLotView;

});