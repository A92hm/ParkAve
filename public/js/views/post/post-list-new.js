
define(['jquery', 'underscore', 'backbone', 'text!templates/post/listnew.html'],
  function($, _, Backbone, Template) {

  var NewPostView = Backbone.View.extend({
    tagName: 'div',
    className: 'modal fade',
    id: 'new-form-modal',
    template: _.template( Template ),

    events: {
      'click #new-post-save': 'savePost'
    },

    initialize: function() {
      
    },

    render: function() {
      this.$el.html( this.template() );
      return this;
    },

    savePost: function(event) {
      // might validate the input here

      this.postAttributes = {
        title: this.$el.find('[name="input-title"]').val(),
        author: this.$el.find('[name="input-author"]').val(),
        body: this.$el.find('[name="text-body"]').val()
      };

      this.trigger('dialog:save');
    }
  });

  return NewPostView;

});