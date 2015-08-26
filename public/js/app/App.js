define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars', 'constants'], function ($, Backbone, Marionette, _, Handlebars, Constants) {
  var App = new Backbone.Marionette.Application();

  function isMobile() {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
  }

  //Organize Application into regions corresponding to DOM elements
  //Regions can contain views, Layouts, or subregions nested as necessary
  App.addRegions({
      pageHeadingRegion:"#app-page-heading",
      mainRegion:"#app-main"
  });

  App.addInitializer(function () {
    // Add class to target a browser, not as standalone app.
    if (window.navigator.standalone !== true) {
      $('body').addClass('no-standalone');
    }

    // Prevent internal links from causing a page refresh.
    $(document).on('click', 'a', function(event) {
      var fragment = Backbone.history.getFragment($(this).attr('href'));
      var matched = _.any(Backbone.history.handlers, function(handler) {
        return handler.route.test(fragment);
      });
      if (matched) {
        event.preventDefault();

        //Normailly, 'trigger' would have been set to 'true', but we are
        //using our own sub routes that don't need to be triggered
        //Backbone.history.navigate(fragment, { trigger: false });
        App.navigate(fragment, { trigger: false });
      }
    });
  });

  App.mobile = isMobile();

  //Navigation functions
  App.navigate = function (route, options) {
    if (!options) {
      options = {};
    }

    Backbone.history.navigate(route, options);
  };

  App.getCurrentRoute = function () {
    return Backbone.history.fragment;
  };

  App.on('initialize:after', function () {
    if (Backbone.history) {
      require(['photos/PhotosApp'], function () {

        if (!Backbone.history.started) {
          Backbone.history.start({ pushState: true });
        }

        if (App.getCurrentRoute() === '' && !App.currentPage) {
          App.trigger(Constants.photos.SHOW_LIST, 'sf'); //San Francisco is the default city
        }
      });
    }
  });

  return App;
});
