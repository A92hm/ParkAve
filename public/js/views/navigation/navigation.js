define(['jquery', 'underscore', 'backbone', 'text!templates/navigation/navigation.html',
        'models/user', 'routing/router'],
  function($, _, Backbone, Template, User, Router) {

    var NavigationView = Backbone.View.extend({
      tagName: 'div',
      template: _.template( Template ),

      events: {
        'click a[href="usersettings"]': 'showUserSettingsPage',
        'click a[href="find-parking"]': 'showParkingLotPage',
        'click a[href="sell-parking"]': 'sellParkingLotPage',
        'click a[href="parking-history"]': 'showParkingHistoryPage',
        'click a[href="parking-review"]': 'showReviewPage'
      },

      initialize: function() {
        if(!this.model){
          this.model = new User();
        }
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
      },

      render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
      },

      showUserSettingsPage: function(){
        if(this.model.get('_id')){
          Router.sharedInstance().navigate('users/' + this.model.get('_id') + '/settings', {trigger: true});
        }
        return false;
      },

      showParkingLotPage: function(){
        Router.sharedInstance().navigate('lots', {trigger: true});
        return false;
      },

      sellParkingLotPage: function(){
        Router.sharedInstance().navigate('lots', {trigger: true});
        return false;
      },

      showParkingHistoryPage: function(){
        Router.sharedInstance().navigate('lot/lot-list', {trigger: true});
        return false;
      },

      showReviewPage: function(){
        if(this.model.get('_id')){
          Router.sharedInstance().navigate('users/' + this.model.get('_id') + '/settings', {trigger: true});
        }
        return false;
      }
    });
    return NavigationView;
});
