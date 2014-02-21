
define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/userFeedback.html',
  'routing/router', 'views/reviews/review'],
  function($, _, Backbone, Template, Router, Review) {

  	var UserFeedbackView = Backbone.View.extend({
	tagName: 'div',
    className: 'userFeedback',
    template: _.template( Template ),

    events: {
      
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html( this.template() );
      return this; 
    }


  	});
  	return UserFeedbackView;

  });
