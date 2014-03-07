define(['jquery', 'underscore', 'backbone', 'text!templates/reviews/review-list.html',
  'routing/router', 'views/reviews/review', 'collections/reviews'],
  function($, _, Backbone, Template, Router, Review, ReviewCollection) {

  var ReviewList = Backbone.View.extend({
    tagName: 'div',
    template: _.template( Template ),

    events: {
    },
    createCollection:function(){
      //create a new collection
      this.collection = null;
      this.collection = new ReviewCollection([],{user: this.user});
      this.collection.fetch();
    },

    initialize: function(options) {
      this.user = options.user;
      this.createCollection();

      //stuff for the average rating
      this.count = 0;
      this.starTot = 0;
      this.averageStars = -1;//no average calculated

      //filters
      this.dateSortTick = 1;
      this.starSortTick = 1;
      this.lengthAccend= true;

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
      console.log('add all');
      this.$reviewList.empty();
      if(this.collection.length == 0){
        //no reviews so put a place holder
        this.$reviewList.delay(200).queue(function (next) {
        $(this).append("<div class=\"well well-md\"> <p>No reviews found</p></div> ");
        next();
        });
      }
      
      this.collection.each(this.addOne, this);
      
    },
    addOne: function(review){// methond
      //calculate star average
      this.count++;
      console.log('add: '+this.collection.models.length);
      this.starTot += review.get("stars");
      if(this.count == this.collection.models.length){
        this.averageStars = (this.starTot/this.collection.models.length);
        this.addAverageStars();
      }
      //slowly add reviews
      var reviewView = new Review({model: review, user: this.user});
      var $theReview = reviewView.render().$el;
      this.$reviewList.delay(200).queue(function (next) {
        $(this).append($theReview.fadeIn(00));
        next();
      });
    },
    sortDate: function(){
      console.log("sort date clicked");
      this.collection.comparator = 'date';
      if(this.dateSortTick > 0){
        this.collection.comparator = function(review){
          var strDate = review.get('date');
          var date = new Date(strDate);
          return -date.getTime();
        };
      }
      this.collection.sort({});
      this.dateSortTick *= -1;
      this.addAll();
      return false;
    },
    sortStars: function(){
      console.log("star acc: " +this.starSortTick);
      this.collection.comparator = 'stars';
      if(this.starSortTick > 0){
        this.collection.comparator = function(review){
          return -review.get('stars');
        };
      }
      this.collection.sort();
      this.$reviewList.html('');
   
      this.starSortTick*=-1;

      this.collection.each(function(review){
        var reviewView = new Review({model: review, user: this.user});
        var $theReview = reviewView.render().$el;
        
        this.$reviewList.delay(200).queue(function (next) {
          $(this).append($theReview.fadeIn(00));
            next();
          });

      },this);

      return false;
    },
    addAverageStars: function(){
      this.$el.find('#stars').empty();
      var starCount = 0;//count stars so we can add empty stars
        console.log('star average');
        for (var i = 0; i < this.averageStars; i++) {//add each star
          starCount++;
          this.$el.find('#stars').delay(500).queue(function(next){
            $(this).append( $("<span class=\"glyphicon glyphicon-star\"></span>").fadeIn(600));//animate in
            next();
          });
        };
        //add empty stars
        for (var i = 0; i < (5-starCount); i++) {//add each star
          this.$el.find('#stars').delay(500).queue(function(next){
            $(this).append( $("<span class=\"glyphicon glyphicon-star-empty\"></span>").fadeIn(600));//animate in
            next();
          });
        };
        //based on average stars change the color
        if(starCount < 2 ){
        //bad rating
          this.$el.find(".average-stars").attr("id", "badAverage");
        }
        else if(starCount < 4){
          //ok rating
          this.$el.find(".average-stars").attr("id", "okAverage");
        }
        else{
          //good rating
          this.$el.find(".average-stars").attr("id", "goodAverage");
        }
        //reset counters
        this.count =0;
        this.starTot = 0;
    },
    filter: function(term){
      console.log(term);
      
      if(term == ""){
        console.log('null term');
        this.createCollection();
        return;
        term = " ";
      }
      
      var found = this.collection.filter(function(review){
        var split = term.split(" ");
        var count = 0;
        for(var s in split){
          //console.log(review.get('body'))
          if(review.get('body').indexOf(split[s]) != -1){
            console.log(review.get('title')+": "+ split[s]);
            count++;
          }
          else if(review.get('title').indexOf(split[s]) != -1){
            count++;
          }
        }
        if(count < split.length) 
          return false;
        else
          return true;
      });
      //clear review list and add items
      console.log(found);
      this.collection.models = found;
      //this.addAll();
      //console.log('add all');
      //this.$reviewList.empty();
      this.$reviewList.html('');
      this.collection.each(this.addOne, this);
      


      /*
      this.$reviewList.empty();
      _.each(found, this.addOne);
      */
    }




  });

  return ReviewList;
});
