define(['jquery', 'underscore', 'backbone', 'text!templates/feedback/feedback.html',
      'routing/router', 'models/feedback', 'collections/feedbacks'],
  function($, _, Backbone, Template, Router, Feedback, FeedbackCollection) {

  var FeedbackView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
      'click #feedback-submit-button': 'submit'
    },

    initialize: function(options) {
    },

    render: function() {
      this.$el.html( this.template() );
      return this;
    },

    submit: function(){
      // Parse the data
      var feedback = this.$el.find('#input-feedback').val();
      var email = this.$el.find('#input-email').val().toLowerCase();

      // Get the user agent
      var userAgent = navigator.userAgent;

      // Validate the input
      var valid = true;
      if(!feedback){
        this.$el.find('#input-feedback').prev().children('i').html( '' );
        valid = false;
      }else{
        this.$el.find('#input-feedback').prev().children('i').html( '' );
      }

      if(!valid){
        return false;
      }

      // Make the new feedback model and set the data
      var newFeedback = new Feedback();
      var feedbackCollection = new FeedbackCollection([newFeedback]);

      newFeedback.set({
        body: feedback,
        email: email,
        userAgent: userAgent
      });

      newFeedback.save({}, {error: function(err) {
          console.log(err);
        }, success: function(model, response) {
          if (!response.err) {
            Router.sharedInstance().navigate('landing', {trigger: true});
          }
        }
      });

      return false;
    }
  });

  return FeedbackView;
});