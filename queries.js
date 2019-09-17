/* Add all the required libraries*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/

//mongoose.connect(config.db.uri, {useNewUrlParser: true});
mongoose.connect(config.db.uri, {useUnifiedTopology: true});
var db= mongoose.connection;
var schema=mongoose.model('Listing').schema;
var myModel=mongoose.model('listmodels', schema);
//.schema
/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */
   var doc;
   myModel.findOne({code: 'LBW'}, function(err, doc){
     if(err) throw err;

     console.log(doc);
   });
  // process.exit();

};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */
   var docum;
   myModel.findOne({code: 'CABL'}, function(err, docum){
     if(err) throw err;

     console.log(docum);
   });

   var doc;
   myModel.deleteOne({code: 'CABL'}, function(err, doc){
     if(err) throw err;

     console.log('Removed CABL');
   });

};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */
   myModel.update({code: 'PHL'},{address: '1953 Museum Rd, Gainesville, FL 32603, United States'}, function(err, doc){

      if(err) throw err;
     //console.log(doc)

   } )

   var doc;
   myModel.findOne({code: 'PHL'}, function(err, doc){
     if(err) throw err;

     console.log(doc);
   });


};
var retrieveAllListings = function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */
   myModel.find({},function(err, doc){

       console.log(JSON.stringify(doc, null, 1));

   })

};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
