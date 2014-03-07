
define(['jquery', 'underscore', 'backbone', 'text!templates/lot/lotListItem.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

  var LotListItemView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
      'click .lot-list-item-delete-button': 'deleteLot'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      if(this.model.get('_id')){
        this.$el.html( this.template( this.model.toJSON() ) );
      }
      return this; 
    },

    deleteLot: function() {
      this.model.destroy({wait: true})
        .done(function(data) {
          // good to go
          console.log('deleting now...');
        })
        .fail(function(xhr, data) {
          console.log('there was a problem deleting the model');
        });
      this.remove();
      this.model.collection.remove(this.model);
      return false; 
    },

    viewLot: function() {
      Router.sharedInstance().navigate(this.model.clienturl(), {trigger: true});
      return false;
    }
  });

  return LotListItemView;

});