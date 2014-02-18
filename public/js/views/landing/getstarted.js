define(['jquery', 'underscore', 'backbone', 'text!templates/landing/getstarted.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

  var GetStartedView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
      'click #sign-up-button': 'signUp'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( this.template( ) );
      return this;
    },

    signUp: function(){
      //TODO

      return false;
    }
  });

  return GetStartedView;
});
