define(['jquery', 'underscore', 'backbone', 'text!templates/user/userpage.html',
        'text!templates/navigation/navigation.html', 'routing/router'],
  function($, _, Backbone, Template, NavigationTemplate, Router) {

    var UserPageView = Backbone.View.extend({
      tagName: 'div',
      template: _.template( Template ),

      events: {
        'click #see-feedback-button': 'showUserFeedbackPage',
        'click a[href="usersettings"]': 'showUserSettingsPage'
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
      },

      render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        this.$el.find('#navbar').html( NavigationTemplate );
        return this;
      },

      showUserFeedbackPage: function(){
        Router.sharedInstance().navigate('users/' + this.model.get('_id') + '/feedback', {trigger: true});
        return false;
      },

      showUserSettingsPage: function(){
        Router.sharedInstance().navigate('users/' + this.model.get('_id') + '/settings', {trigger: true});
        return false;
      }
    });
    return UserPageView;
});
