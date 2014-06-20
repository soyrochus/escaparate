/* global require, define , booksapp */

define(['Ractive', 'Backbone', 'rvc!app/books'], function(Ractive, Backbone, BooksView){

  debugger;
  var FormData = Backbone.Model.extend();
  var Book = Backbone.Model.extend();
  var Books = Backbone.Collection.extend({
    parse: function(response, options){
      return response.data;
    },
    model: Book,
    url: '/services/books',

    retrieveAll: function(){
      debugger;
      this.fetch({
        success: function(collection, response, options){
          debugger;
          collection.showAll();
        }
      });
    },
    showAll: function(){
      if(this.view){
        this.view.showTable();
      }else{

        this.view = new BooksView({
          el: booksapp.render.main,
          data: new FormData({books: this, form: new Book()}),
          adaptors: [ 'Backbone' ]
        });
      }
    },
    show: function(id){
      debugger;
      var book = this.findWhere({id: id});
      if(!book || !this.view){
        throw new Error('Book not found or View not created');
      }

      this.view.showForm(book);
    }
  });

  return {
    Model: Book,
    Collection: Books,
    View: BooksView
  };
  /*Alternativamente, se podria devolver un funcion
   * return function(){

    return new Books();
  };*/

});