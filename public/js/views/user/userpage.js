define(['jquery', 'underscore', 'backbone', 'text!templates/user/userpage.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

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
        return this;
      },

      showUserFeedbackPage: function(){
        Router.sharedInstance().navigate('users/' + this.model.get('_uid') + '/feedback', {trigger: true});
      }
    });
    return UserPageView;
});
