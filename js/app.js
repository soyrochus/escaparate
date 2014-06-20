/* globals requirejs  demoapp console */

requirejs.config({
  baseUrl: 'js/libs',
  paths: {
    app: '../app',
    encender: '../encender/encender',
    jquery: 'jquery/dist/jquery',
    Ractive: 'ractive/ractive',
    'amd-loader': 'requirejs-ractive/amd-loader',
    rv: 'requirejs-ractive/rv',
    rvc: 'requirejs-ractive/rvc',
    'ractive-backbone': 'ractive-backbone/Ractive-backbone',
    Backbone: 'backbone/backbone',
    'deep-model': 'backbone-deep-model/distribution/deep-model',
    'jquery-ui': 'jquery-ui/ui/jquery-ui',
    underscore: 'underscore/underscore'
  },
  map: {
    '*': {
      'backbone': 'Backbone',
      'ractive': 'Ractive'
    }
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'Backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'deep-model':{
      deps: ['Backbone']
    },
    'ractive-backbone':{
      deps: ['Ractive', 'Backbone']
    },
    'rvc': {
      deps: ['Ractive','ractive-backbone', 'deep-model']
    },
    'rv': {
      deps: ['Ractive','ractive-backbone', 'deep-model']
    },
    'jquery-ui': {
      exports: '$',
      deps: ['jquery']
    }
  },
  callback: function(){}
});

if (typeof demoapp === 'undefined'){
  var demoapp = {
    render: {
      baseUrl: '/public/',
      main: "#render-main"
    }
  };
}


requirejs(['jquery', 'Ractive', 'Backbone', 'rvc!app/books'], function($, Ractive, Backbone, BookView){

  var Router = Backbone.Router.extend({

    routes: {
      "":             "home",   // #
      "books":        "books",  // #books
      "books/:id":    "books"   // #books/1234
    },

    home: function() {


    $.getJSON("/services/books", {} , function(data){

      var view = new BookView({
        el: demoapp.render.main,
        data: data
      })
    }).error(function(error){

      alert("Error: " + error);
    });

      console.log("Home");
      new BookView({
        el: demoapp.render.main,
        data: {
          name: 'Books'
        }
      });
    },

    books: function(id) {

      //
    }

  });

  $(function(){
    demoapp.router = new Router();
    /*
     * If your application is not being served from the root url / of your domain,
     * be sure to tell History where the root really is, as an option:
     * Backbone.history.start({pushState: true, root: "/public/search/"})
     */
    Backbone.history.start({pushState: false, root: demoapp.baseUrl});


  });

});
