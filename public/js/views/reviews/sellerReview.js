define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/review.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

  	var ReviewView = Backbone.View.extend({
	  tagName: 'div',
    template: _.template( Template ),

    events: {
      
    },

    initialize: function(options) {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.seller = options.seller;
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this; 
    },


  	});
  	return ReviewView;

  });
