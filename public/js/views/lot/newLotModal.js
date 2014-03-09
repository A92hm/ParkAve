
define(['jquery', 'underscore', 'backbone', 'text!templates/lot/newLotModal.html',
        'text!templates/widgets/inputerror.html',],
  function($, _, Backbone, Template, InputErrorTemplate) {

  var NewLotView = Backbone.View.extend({
    tagName: 'div',
    className: 'modal fade',
    template: _.template( Template ),

    events: {
      'keypress .new-lot-main-input': 'checkPasswordInputForEnterKey',
      'click #new-lot-save-button': 'saveLot'
    },

    initialize: function(options) {
      this.user = options.user;
    },

    render: function() {
      this.$el.html( this.template() );
      return this;
    },

    saveLot: function(event) {
      // might validate the input here
      var inputTitle = this.$el.find('[name="input-title"]');
      var inputStreet = this.$el.find('[name="input-address"]');
      var inputCity = this.$el.find('[name="input-city"]');
      var inputZip = this.$el.find('[name="input-zip"]');
      var inputState = this.$el.find('[name="input-state"]');

      this.lotAttributes = {
        title: inputTitle.val(),
        user_id: this.user.get('_id'),
        address: {
          street: inputStreet.val(),
          city: inputCity.val(),
          zip: inputZip.val(),
          state: inputState.val()
        }
      };

      // Some input validation
      if (inputTitle.val() == '') {
        alert('Input title');
        inputTitle.focus();
        return;
      } else if (this.lotAttributes.street == '') {
        alert('Input street');
        inputStreet.focus();
        return;
      } else if (this.lotAttributes.city == '') {
        alert('Input city');
        inputCity.focus();
        return;
      } else if (this.lotAttributes.zip == '') {
        alert('Input zip');
        inputZip.focus();
        return;
      } else if (this.lotAttributes.state == '') {
        alert('Input state');
        inputState.focus();
        return;
      }

      // Geocoding time!!
      var API_KEY = 'AIzaSyB1sgyCCyjydPDo6rFweWMbrDyU6uRxPGM';
      // The url for the geocoding.  The spaces need to be replaced with '+' for the url to work
      // Should do some error checking first.
      var geocodingAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + inputStreet.val().split(' ').join('+') + ',+' + inputCity.val().split(' ').join('+')
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
    },

    checkPasswordInputForEnterKey: function(evt){
      if(evt.keyCode == 13){
        this.saveLot();
        return false;
      }
    }
  });

  return NewLotView;

});