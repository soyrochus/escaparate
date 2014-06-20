/* global requirejs */

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

if (typeof booksapp === 'undefined'){
  var booksapp = {
    render: {
      baseUrl: '/public/',
      main: "#render-main"
    }
  };
}


requirejs(['jquery', 'Ractive', 'Backbone', 'encender', 'app/books'], function($, Ractive, Backbone, encender, books){

  var Router = Backbone.Router.extend({

    routes: {
      "":             "home",   // #
      "books":        "books",  // #books
      "books/:id":    "books"   // #books/1234
    },

    home: function() {
      console.log("Home");
      new Ractive({
        el: booksapp.render.main,
        template: '#template-home',
        data: {
          name: 'Books'
        }
      });
    },

    books: function(id) {
      if(id){
        //retrieve one particular book
        booksapp.books.show(id);
      } else{
        //retrieve collection & display
        if(!booksapp.books){
          booksapp.books = new books.Collection();
          booksapp.books.retrieveAll();
        } else{
          booksapp.books.showAll();
        }
      }
    }

  });

  $(function(){
    booksapp.router = new Router();
    encender.delegateNavigation('/', booksapp.router);
    /*
     * If your application is not being served from the root url / of your domain,
     * be sure to tell History where the root really is, as an option:
     * Backbone.history.start({pushState: true, root: "/public/search/"})
     */
    Backbone.history.start({pushState: false, root: booksapp.baseUrl});

    var forward = encender.getQueryParams()['forward-url'];
    if (forward){
      booksapp.router.navigate(forward, {trigger: true});
    }

  });

});
