define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/review-list.html',
  'routing/router', 'views/reviews/review', 'collections/reviews'],
  function($, _, Backbone, Template, Router, Review, ReviewCollection) {

  var ReviewList = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
    },

    initialize: function(options) {
      this.user = options.user;
      //create collection
      this.collection = new ReviewCollection([],{user: this.user});
      this.collection.fetch();

      //stuff for the average rating
      this.count = 0;
      this.starTot = 0;
      this.averageStars = -1;//no average calculated

      //listeners
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'add', this.addOne);
      //this.listenTo(this.collection, 'sort', this.addAll);
    },

    render: function() {
      this.$el.html( this.template( ) );
      this.$reviewList = this.$el.find('#review-list');
      this.$reviewList.html("loading...");
      this.addAll();
      
      return this;
    },
    addAll: function(){
      this.$reviewList.empty();
      this.collection.each(this.addOne, this);
    },
    addOne: function(review){
      //calculate star average
      this.count++;
      this.starTot += review.get("stars");
      if(this.count == this.collection.length){
        this.averageStars = (this.starTot/this.collection.length);
        this.addAverageStars();
      }
      console.log("adding one");
      //slowly add reviews
      var reviewView = new Review({model: sellerReview, user: this.user});
      var $review = reviewView.render().$el;
      this.$reviewList.delay(400).queue(function (next) {
        $(this).append($review.fadeIn(400));
        next();
      });
    },
    getAverage: function(){
      var total = 0;
      var count = 0;
      this.collection.each(function(review){
        count++;
        total = total + review.get("stars");
        console.log("strs"+ review.get("stars"));
      },this);
      console.log('total: '+total);
      return total/count;
    },
    sortDate: function(){
      console.log("sort date clicked");
      this.collection.comparator = 'date';
      this.collection.sort({});
      //this.collection.reset(this.collection);
      //this.addAll();
      return false;
    },
    sortStars: function(){
      console.log("sort stars clicked");
      this.collection.comparator = function(r1,r2){
        console.log("inside comparator");
        var retNum = 0;
        if(r1.get("stars") == r2.get("stars")){
          retNum = 0;
        }
        else if(r1.get("stars") > r2.get("stars")){
          retNum = -1;
        }
        else{
          retNum = 1;
        }
        console.log(retNum);
        return retNum;
      };
      this.collection.sort();
      this.$reviewList.empty();
      //console.log(this.collection.length);
      console.log(this);
      this.collection.each(function(r){
        console.log(r.get("stars"));
        //this.addOne(r);
      }, this);
      this.addAll();
      //this.collection.reset();
      //this.collection.fetch();
      return false;
    },
    sortLength: function(){
      console.log("sort length clicked");
      this.collection.comparator = 'body';
      this.collection.sort({});
      return false;
    },





    addAverageStars: function(){
      this.$el.find('#stars').empty();
      var starCount = 0;//count stars so we can add empty stars
        for (var i = 0; i < this.averageStars; i++) {//add each star
          starCount++;
          this.$el.find('#stars').delay(500).queue(function(next){
            $(this).append( $("<span class=\"glyphicon glyphicon-star\"></span>").fadeIn(600));//animate in
            next();
          });
        };
        //add empty stars
        for (var i = 0; i <= (5-starCount); i++) {//add each star
          starCount++;
          this.$el.find('#stars').delay(500).queue(function(next){
            $(this).append( $("<span class=\"glyphicon glyphicon-star-empty\"></span>").fadeIn(600));//animate in
            next();
          });
        };
        //based on average stars change the color
        if(this.averageStars < 3 ){
        //bad rating
          this.$el.find(".average-stars").attr("id", "badAverage");
        }
        else if(this.averageStars < 4){
          //ok rating
          this.$el.find(".average-stars").attr("id", "okAverage");
        }
        else{
          //good rating
          this.$el.find(".average-stars").attr("id", "goodAverage");
        }
    }
    




  });

  return ReviewList;
});
