
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/editSpot.html',
        'text!templates/widgets/inputerror.html', 'models/spot'],
  function($, _, Backbone, Template, InputErrorTemplate, Spot) {

  var NewSpotView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template( Template ),

    events: {
      'click .new-spot-cancel-button': 'cancelAddSpots',
      'click .new-spot-save-button': 'addSpots'
    },

    initialize: function(options) {
      this.user = options.user;
      this.lot = options.lot;

    },

    render: function() {
      if(!this.model){
        this.model = new Spot();
      }
      this.model.set('getFormattedDateString', this.getFormattedDateString);
      this.$el.html( this.template( this.model.toJSON() ) );
      var surface = this.model.get('surface');
      var blocked = this.model.get('blocked');
      //set the select inputs
      this.$el.find('#select-surface').val(surface);
      if(blocked)
        this.$el.find('#select-blocked').val('yes');
      else
        this.$el.find('#select-blocked').val('no');
      return this;
    },

    cancelAddSpots: function(event) {
      this.trigger('spots:cancel');
    },

    addSpots: function(event) {
      // validate the input here

      var inputNumSpots = this.$el.find('[name="input-num-spots"]');
      var inputPrice = this.$el.find('[name="input-price"]');
      var inputStartDate = this.$el.find('[name="input-start-date"]');
      var inputEndDate = this.$el.find('[name="input-end-date"]');
      var inputParkingSurface = this.$el.find('[name="input-parking-surface"]');
      var inputBlocked = this.$el.find('[name="input-blocked"]');
      var inputDescription = this.$el.find('[name="input-description"]');

      if(!inputNumSpots.val() || !inputPrice.val() || !inputStartDate.val() || !inputEndDate.val()){
        return;
      } else if (inputNumSpots.val() < 0) {
        alert('Input a positive number of spots to sell.');
        return;
      } else if(this.model.get('buyer_list') && inputNumSpots.val() < this.model.get('buyer_list').length){
        alert('Spot removal not allowed. You have already sold these spots');
        return;
      }

      var isBlocked = false;
      if(inputBlocked.val() == "yes");
        isBlocked = true;

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
        surface: inputParkingSurface.val() || 'grass',
        blocked: isBlocked,
        description: inputDescription.val() || ''
      };
      this.trigger('spots:save');
    },

    getFormattedDateString: function(dateString){  // from ISO/UTC to YYYY-MM-DD
      var date = new Date(dateString);
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

