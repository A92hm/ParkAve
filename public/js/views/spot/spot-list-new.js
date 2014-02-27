
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/listnew.html', 'text!templates/widgets/inputerror.html',],
  function($, _, Backbone, Template, InputErrorTemplate) {

  var NewSpotView = Backbone.View.extend({
    tagName: 'div',
    className: 'modal fade',
    id: 'new-form-modal',
    template: _.template( Template ),

    events: {
      'click #new-spot-save': 'saveSpot'
    },

    initialize: function() {
      
    },

    render: function() {
      this.$el.html( this.template() );
      return this;
    },

    saveSpot: function(event) {
      // might validate the input here

      var inputTitle = this.$el.find('[name="input-title"]');
      var inputDate = this.$el.find('[name="edit-date-of-birth"]');
      var inputNumSpots = this.$el.find('[name="input-num-spots"]');
      var inputPrice = this.$el.find('[name="input-price"]');
      var inputParkingSurface = this.$el.find('[name="input-parking-surface"]');

      this.spotAttributes = {
        title: inputTitle.val(),
        date: inputDate.val(),
        numSpots: inputNumSpots.val(),
        price: inputPrice.val(),
        // parkingSurface = inputParkingSurface.val();
        event_id: "1"
      };

      this.trigger('dialog:save');
    }
  });

  return NewSpotView;

});