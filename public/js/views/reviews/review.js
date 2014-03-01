define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/review.html',
  'routing/router', 'models/user', 'collections/users'],
  function($, _, Backbone, Template, Router, User, UsersCollection) {

  	var ReviewView = Backbone.View.extend({
	  tagName: 'div',
    template: _.template( Template ),

    events: {
      
    },

    initialize: function(options) {
      this.user = options.user;
      this.reviewerID = this.model.get("reviewer_id");
      this.reviewer = new User({_id: this.reviewerID});
      var usersCollection = new UsersCollection([this.reviewer]);
      usersCollection.fetch();

      this.listenTo(this.reviewer, 'change', this.render);
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      
      //set the buyer name

      //!! Names are not working !!
      //TODO
      //var firstName = this.reviewer.get("firstName") ;
      //console.log(firstName);
      //format the date
      var date = this.model.get("date");
       // console.log('date: ');
      //console.log(date);
      var formattedDate = date.substring(0,10);
      //set the model
      this.model.set({reviewerID: this.reviewerID, reviewerName: 'Reviewer', reviewDate: date});

      this.$el.html( this.template( this.model.toJSON() ) );
      var stars = this.model.get("stars");
      for (var i = 0; i < stars; i++) {
        this.$el.find('#stars').delay(300).queue(function(next){
            $(this).append( $("<span class=\"glyphicon glyphicon-star\"></span>").fadeIn(600));//animate in
            next();
          });
      };
      for (var i = 0; i < (5 - stars); i++) {
        this.$el.find('#stars').delay(200).queue(function(next){
            $(this).append( $("<span class=\"glyphicon glyphicon-star-empty\"></span>").fadeIn(600));//animate in
            next();
          });
      };
      //change type of panel based on stars
      if(stars == 0){
        //no star value added
        this.$el.find(".review").addClass("panel-default");
      }
      else if(stars < 2 ){
        //bad rating
        this.$el.find(".review").addClass("panel-danger");

      }
      else if(stars < 4){
        //ok rating
        this.$el.find(".review").addClass("panel-warning");

      }
      else{
        //good rating
        this.$el.find(".review").addClass("panel-success");

      }
      return this;
      
    },


  	});
  	return ReviewView;

  });
