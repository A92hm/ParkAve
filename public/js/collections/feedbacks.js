define(['underscore','backbone', 'models/Feedback'], function(_, Backbone, Feedback) {

  var FeedbacksCollection = Backbone.Collection.extend({
    model: Feedback,
    url: '/api/feedback'
  });

  return FeedbacksCollection;
});
