
define(['jquery', 'underscore', 'backbone', 'text!templates/lot/listnew.html'],
  function($, _, Backbone, Template) {

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
      var inputParkingSurface = this.$el.find('[name="input-parking-surface"]');


      this.lotAttributes = {
        title: inputTitle.val(),
        address1: inputAddress1.val(),
        address2: inputAddress2.val(),
        city: inputCity.val(),
        zip: inputZip.val(),
        state: inputState.val(),
        parkingSurface: inputParkingSurface.val()
      };


      // Some input validation
      if (this.lotAttributes.title == '') {
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

      this.trigger('dialog:save');
    }
  });

  return NewLotView;

});