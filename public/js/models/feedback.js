define(['underscore','backbone'], function(_, Backbone) {

  var Feedback = Backbone.Model.extend({
    idAttribute: '_id',

    defaults: {
      body: '',
      email: '',
      userAgent: ''
    },

    initialize: function() {
    }
  });

  return Feedback;
});