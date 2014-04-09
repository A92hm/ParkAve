
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/spotList.html',
        'text!templates/spot/editSpot.html', 'views/spot/spotListItem', 'views/spot/spot'],
  function($, _, Backbone, Template, EditSpotTemplate, SpotListItemView, SpotView) {

  var SpotListView = Backbone.View.extend({
    tagName: 'div',
    className: 'spot-list-div',
    template: _.template( Template ),

    events: {
    },

    initialize: function(options) {
      this.user = options.user;
    },

    render: function() {
      var editSpotTemplate = _.template( EditSpotTemplate );
      this.$el.html( this.template() );
      this.$spots = this.$el.find('#spot-list-view-table-body');
      this.addAll();
      this.$el.find('#spot-list-add-spot-button').popover({
        html : true, 
        content: function() {
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
            spot.getFormattedDateString = function(){ return ""; };
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
    }
  });

  return SpotListView;

});