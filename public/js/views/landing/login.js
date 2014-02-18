define(['jquery', 'underscore', 'backbone', 'text!templates/landing/login.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

  var LoginView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html( this.template( ) );
      return this;
    }
  });

  return LoginView;
});

//TODO
