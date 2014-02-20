define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/review.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

  	var ReviewView = Backbone.View.extend({
	  tagName: 'div',
    className: 'review',
    template: _.template( Template ),

    events: {
      
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html( this.template() );
      return this; 
    },


  	});
  	return ReviewView;

  });
