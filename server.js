/* globals require */
var express = require("express"),
    http = require("http"),
    path = require("path"),
    mdata = require("remedata"),
    app = express();

app.configure(function () {
    // Define our static file directory, it will be the root of the site
    app.use('/public/',express.static(path.join(__dirname, '/')));
    app.use(express.bodyParser({
          keepExtensions: true,
          limit: 1000000000, //1G
          defer: true
    }));
});


http.createServer(app).listen(8090, function(){
    console.log("Express server listening on port 8090");
});

app.get('/services/books', mdata.toread('mockdata/books.json', function(data, request, response) {

    return data;

    /* var taskId = request.params.id;
    try {
       var res = mdata.find(taskId, data);
       if (res >= 0){
          return data[res];
       } else {
          return {success: false};
       }
    } catch (error) {
        console.log(error);
        response.send(error);
    }*/

}));

app.put('/services/books/:id', mdata.towrite('mockdata/books.json',  function(data, newdata, save, req, res){

  var record = mdata.merge(newdata, data);
  save(data);
  return record;
}));
