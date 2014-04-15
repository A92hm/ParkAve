
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/spotListItem.html',
  'routing/router', 'socket.io'],
  function($, _, Backbone, Template, Router, io) {

  var SpotListItemView = Backbone.View.extend({
    tagName: 'tr',
    className: 'spot-list-item',
    template: _.template( Template ),

    events: {
      'click .spot-list-item-delete-button': 'deleteSpot'
    },

    initialize: function() {
      //create socket
      var fullurl = document.URL;
      var endIndex = fullurl.indexOf('/', 7);
      var url = fullurl.substr(0, endIndex);
      this.socket = io.connect(url);
      var self = this;
      this.socket.on('updatedSpot', function(model){
        console.log('a spot was updated');
        console.log(model);
        if(model._id == self.model.get('_id')){
          self.model.fetch();
        }
      });

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      if(this.model.get('_id')){
        this.$el.html( this.template( this.model.toJSON() ) );
        this.$el.attr('id', 'spot-list-item-' + this.model.get('_id'));
      }
      return this; 
    },

    deleteSpot: function() {
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

    viewSpot: function() {
      Router.sharedInstance().navigate(this.model.clienturl(), {trigger: true});
      return false;
    }
  });

  return SpotListItemView;

});