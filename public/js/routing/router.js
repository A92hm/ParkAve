
define(['underscore', 'require', 'backbone'], 
  function(_, require, Backbone, MainAppView) {

  var Router = Backbone.Router.extend({
    routes: {
      'posts':      'posts',
      'posts/:id':  'post',

      'posts/:pid/comments':      'comments',
      'posts/:pid/comments/:cid':  'comment',

      '': 'main'
    },

    main: function() {
      this.navigate('posts', {trigger: true});
    },

    posts: function() {
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showPosts();
      });

      // we can require the main view dynamically when needed. if not we encouter a circularity:
      // router -> main -> post list -> post list item -> router
    }, 

    post: function(id) {
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showPost(id);
      });
    },

    comments: function(pid) {
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showComments(pid);
      });
    },

    comment: function(pid, cid) {
      require(['views/application/main'], function(MainAppView) {
        MainAppView.sharedInstance().showComment(pid, cid);
      });
    },

    // call start when the application is ready to begin routing

    start: function() {
      var router = this;

      // Set up browser history
      Backbone.history.start({ pushState: true });

      // Router fix so that internal links do not all have to begin with hashes
      // Or rather so that the browser doesn't always refersh the page

      $(document).on("click", "a[href^='/']", function(evt) {
        var href = $(this).attr('href');
        var protocol = this.protocol + '//';

        if (href.slice(protocol.length) !== protocol) {
          evt.preventDefault();
          router.navigate(href, true);
        }
      });
    }
  });

  Router.sharedInstance = _.once(function() {
    return new Router();
  });

  return Router;
});