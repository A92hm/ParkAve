
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/spotList.html',
        'views/spot/spotListItem', 'views/spot/spot'],
  function($, _, Backbone, Template, SpotListItemView, SpotView) {

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
      this.$el.html( this.template() );
      this.$spots = this.$el.find('#spot-list-view-table-body');
      this.addAll();
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