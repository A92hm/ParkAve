
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/spotList.html',
        'text!templates/spot/editSpot.html', 'views/spot/spotListItem', 'views/spot/spot'],
  function($, _, Backbone, Template, EditSpotTemplate, SpotListItemView, SpotView) {

  var SpotListView = Backbone.View.extend({
    tagName: 'div',
    className: 'spot-list-div',
    template: _.template( Template ),

    events: {
      'click .new-spot-cancel-button': 'cancelAddSpots',
      'click .new-spot-save-button': 'addSpots'
    },

    initialize: function(options) {
      this.user = options.user;
    },

    render: function() {
      var editSpotTemplate = _.template( EditSpotTemplate );
      this.$el.html( this.template() );
      this.$spots = this.$el.find('#spot-list-view-table-body');
      this.addAll();
      this.$el.find('#spot-list-add-spot-button').popover(
      {
        html : true, 
        content: function() {
          console.log('new spot popover');
          var spot;
          if(this.spotToEdit){
            spot = this.spotToEdit.toJSON();
          }
          if(!spot){
            spot = {};
            spot.numSpots = 0;
            spot.price = 0;
            spot.startDate = "";
            spot.endDate = "";
            spot.getFormattedDateString = function(dateString){  // from ISO/UTC to YYYY-MM-DD
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
            };
          }
          return editSpotTemplate( spot );
        },
        title: function() {
          return "Add Spots";
        }
      });
      return this;
    },

    addAll: function() {
      this.$spots.empty();
      this.collection.each(this.addOne, this);
    },

    addOne: function(spot) {
      var spotView = new SpotListItemView({model: spot});
      this.$spots.children(':last-child').removeClass('spot-list-last');
      this.$spots.append( spotView.render().el );
      this.$spots.children(':last-child').addClass('spot-list-last');
    },

    cancelAddSpots: function(event) {
      this.trigger('spots:cancel');
    },

    addSpots: function(event) {
      alert('yoolo');
      // validate the input here
      console.log('add spot');
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
      //this.socket.emit('updatingSpot', this.model);
    }
  });

  return SpotListView;

});