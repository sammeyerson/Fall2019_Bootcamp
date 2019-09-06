var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);



  if( parsedUrl.pathname=="/listings"){
    response.end(listingData);

  }
  else{
    /*response.end('404 error boiiiiiiiii.');*/
    /*response.status(404).send('Page not found, sorrrrry');*/
    response.setHeader('Context-Type','text/html');
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Bad gateway error');
  }

  /*
    Your request handler should send listingData in the JSON format as a response if a GET request
    is sent to the '/listings' path. Otherwise, it should send a 404 error.

    HINT: Explore the request object and its properties
    HINT: Explore the response object and its properties
    https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation

    HINT: Explore how callback's work
    http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4

    HINT: Explore the list of MIME Types
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
   */
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.

    HINT: Check out this resource on fs.readFile
    //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

    HINT: Read up on JSON parsing Node.js
   */

    //Check for errors


   //Save the sate in the listingData variable already defined
   listingData=data;


  //Creates the server
  var server = http.createServer(requestHandler);



  //Start the server
  server.listen(port, function(){
    console.log('The server is listening on port '+port);
  });
  console.log('Lets try this out.');


});
