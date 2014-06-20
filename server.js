/* globals require */

var express = require("express"),
    http = require("http"),
    path = require("path"),
    mdata = require("remedata"),
    app = express();

app.use('/public/',express.static(path.join(__dirname, '/')));


http.createServer(app).listen(8090, function(){
    console.log("Express server listening on port 8090");
});

app.get('/services/books', mdata.toread('mockdata/books.json', function(data, request, response) {

  //return data;   -  enviar data estilo Ext.js
  response.send({
    books: data
  });  // enviar data sin encapsular en un objeto con propriedad "success"


}));

/*app.put('/services/books/:id', mdata.towrite('mockdata/books.json',  function(data, newdata, save, req, res){

  var record = mdata.merge(newdata, data);
  save(data);
  return record;
}));
*/
