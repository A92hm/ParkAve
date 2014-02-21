define(['jquery', 'underscore', 'backbone', 
  'text!templates/navigation/navigation.html',
  'text!templates/profile/account-setting.html',
  'routing/router','holder/holder'],
  function($, _, Backbone, showNav,Template, Router, Holder) {

  var AccountSettingView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),
    events: {
      'click #update-account-button': 'updateUserAccount'
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template);
      this.$el.find('#navbar').html(showNav);
      return this; 
    },

    updateUserAccount: function(){
      // Parse the data
      var firstName = this.$el.find('#edit-first-name').val();
      var lastName = this.$el.find('#edit-last-name').val();
      var dateOfBirth = this.$el.find('#edit-date-of-birth').val();
      var address = this.$el.find('#edit-address').val();
      var city = this.$el.find('#edit-city').val();
      var state = this.$el.find('#edit-state').val();
      var zipcode= this.$el.find('#edit-zipcode').val();
      var phone = this.$el.find('#edit-phone').val();
      var email = this.$el.find('#edit-email').val();
      return false;
    }
  });

  return AccountSettingView;
});
