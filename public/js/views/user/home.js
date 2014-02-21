define(['jquery', 'underscore', 'backbone', 'text!templates/user/home.html',
        'views/navigation/navigation', 'routing/router'],
  function($, _, Backbone, Template, NavigationView, Router) {

    var UserPageView = Backbone.View.extend({
      tagName: 'div',
      template: _.template( Template ),

      events: {
        'click #see-feedback-button': 'showUserFeedbackPage'
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
      },

      render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        var navigationView = new NavigationView( {model: this.model} );
        this.$el.find('#navbar').html( navigationView.render().el );
        return this;
      },

      showUserFeedbackPage: function(){
        Router.sharedInstance().navigate('users/' + this.model.get('_id') + '/feedback', {trigger: true});
        return false;
      }
    });
    return UserPageView;
});
