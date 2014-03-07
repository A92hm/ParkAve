
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/newSpotModal.html',
        'text!templates/widgets/inputerror.html', 'models/spot'],
  function($, _, Backbone, Template, InputErrorTemplate, Spot) {

  var NewSpotView = Backbone.View.extend({
    tagName: 'div',
    className: 'modal fade',
    template: _.template( Template ),

    events: {
      'click .new-spot-save-button': 'addSpots'
    },

    initialize: function(options) {
      console.log(options);
      this.user = options.user;
      this.lot = options.lot;
    },

    render: function() {
      console.log(this.model);
      if(!this.model){
        this.model = new Spot();
        console.log(this.model);
      }
      this.model.set('getFormattedDateString', this.getFormattedDateString);
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    },

    addSpots: function(event) {
      // validate the input here

      var inputNumSpots = this.$el.find('[name="input-num-spots"]');
      var inputPrice = this.$el.find('[name="input-price"]');
      var inputStartDate = this.$el.find('[name="input-start-date"]');
      var inputEndDate = this.$el.find('[name="input-end-date"]');
      var inputParkingSurface = this.$el.find('[name="input-parking-surface"]');

      if(!inputNumSpots.val() || !inputPrice.val() || !inputStartDate.val() || !inputEndDate.val() || !inputParkingSurface.val()){
        console.log('this');
        return;
      }

      function parseDate(dateString){  // YYYY-MM-DD
        var date = new Date(dateString.slice(0, 4), dateString.slice(5, 7), dateString.slice(8, 10))
        return date;
      }
      var startDate = parseDate(inputStartDate.val());
      var endDate = parseDate(inputEndDate.val());
      this.spotAttributes = {
        user_id: this.user.get('_id'),
        lot_id: this.lot.get('_id'),
        spotId: this.model.get('_id'),
        numSpots: inputNumSpots.val(),
        price: inputPrice.val(),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        surface: inputParkingSurface.val()
      };
      this.trigger('dialog:save');
    },

    getFormattedDateString: function(dateString){  // from ISO/UTC to YYYY-MM-DD
      var date = new Date(dateString);
      console.log(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
      var monthString = date.getMonth();
      var dayString = date.getDate();
      if(date.getMonth() < 10){
        monthString = '0' + monthString;
      }
      if(date.getDate() < 10){
        dayString = '0' + dayString;
      }
      return date.getFullYear() + '-' + monthString + '-' + dayString;
    }
  });

  return NewSpotView;

});

