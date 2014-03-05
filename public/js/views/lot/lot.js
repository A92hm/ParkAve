
define(['jquery', 'underscore', 'backbone', 'text!templates/lot/lot.html',
  'routing/router', 'collections/lots', 'views/lot/lot-list-new', 'models/user', 'collections/users'],
  function($, _, Backbone, Template, Router, LotsCollection, NewLotView, User, UsersCollection) {


  var LotView = Backbone.View.extend({
    tagName: 'div',
    className: 'lot',
    template: _.template( Template ),

    events: {
      'click a[href="#delete"]': 'deleteLot',
      'click a[href="#lots"]': 'returnToLots',
      'click a[href="#create-spot"]': 'createSpot'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this; 
    },

    returnToLots: function() {
      var currentUser = new User({_id : this.model.collection.user.id});
      var usersCollection = new UsersCollection([currentUser]);
      var lots = new LotsCollection([], {user: currentUser});
      Router.sharedInstance().navigate(lots.clienturl(), {trigger: true});
      return false;
    },

    deleteLot: function() {
      var uId = this.model.collection.user.id;
      this.model.destroy({wait: true})
        .done(function(data) {
          { // pop back to lots. this is annoying

            // Need to get the user first
            var currentUser = new User({_id : uId});
            var usersCollection = new UsersCollection([currentUser]);
            var lots = new LotsCollection([], {user: currentUser});
            Router.sharedInstance().navigate(lots.clienturl(), {trigger: true});
          }
        })
        .fail(function(xhr, data) {
          console.log('there was a problem deleting the model');
        });
      return false;
    },

    createSpot: function() {
      Router.sharedInstance().navigate(this.model.clienturl() + '/spots', {trigger: true});
      return false;
    }
  });

  return LotView;
});