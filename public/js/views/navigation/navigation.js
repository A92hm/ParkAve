define(['jquery', 'underscore', 'backbone', 'text!templates/navigation/navigation.html',
        'models/user', 'routing/router'],
  function($, _, Backbone, Template, User, Router) {

    var NavigationView = Backbone.View.extend({
      tagName: 'div',
      template: _.template( Template ),

      events: {
        'click a[href="usersettings"]': 'showUserSettingsPage',
        'click a[href="#Sell"]':        'sellParking'
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

      // Reroute to the lots page
      sellParking: function() {
        Router.sharedInstance().navigate(this.model.clienturl() + '/lots', {trigger: true});
        return false;
      }
    });
    return NavigationView;
});
