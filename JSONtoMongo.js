'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
mongoose.connect(config.db.uri, {useNewUrlParser: true});
var db= mongoose.connection;


/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
var schema=mongoose.model('Listing').schema;
var data;
var listModel= mongoose.model('listModel', schema);
fs.readFile('listings.json', 'utf8', function(err, data) {
  if(err) throw err;


  var parsedData = JSON.parse(data);

  for (let i=0; i<parsedData.entries.length; i++){
  //  console.log(i);
  //  console.log(parsedData.entries[i]);
  var individualData= new listModel;
  individualData.name=parsedData.entries[i].name;
  individualData.code=parsedData.entries[i].code;
  individualData.coordinates=parsedData.entries[i].coordinates;
  individualData.address=parsedData.entries[i].address;
  individualData.save(function(error) {
      console.log(parsedData.entries[i]+" has been saved");
      if (error) {
        console.error(error);
      }
    });
  }

  //console.log(data.entries);

});
/*
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
