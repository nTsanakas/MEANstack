//MongoDB connection URI
var user = user //Can be user or admin atm.
var dbURI = 'mongodb://localhost:27017/exampleDb';
var olURI = 'mongodb://user:12345@ds111461.mlab.com:11461/pixano';

//If moved to a deifferent provider, make sure to set NODE_ENV accordingly.
if (process.env.NODE_ENV === 'production') {
  dbURI = olURI;
}

//Retrieve
var mongoClient = require('mongodb').MongoClient;

//Ensure SIGINT fires under windows.
var readLine = require('readline');
if (process.platform === 'win32') {
  var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', function(){
    process.emit('SIGINT');
  });
}

//Connect to the database
mongoClient.connect(dbURI, function(err, db) {
  if(!err) {
    console.log("MongoDB connected");
  }

  //On SIGINT close MongoDB connection.
  process.on('SIGINT', function () {
    console.log('Closing MongoDB connection');
    db.close();
    process.exit();
  });

  //Heroku emits SIGTERM, so listen for it.
  process.on('SIGTERM', function () {
    console.log('Closing MongoDB connection');
    db.close();
    process.exit();
  });

  //Hereby assuming the client will attempt an automatic reconnect as per default.
  db.on('error', function(){
    console.log('Error, closing MongoDB connection');
    db.close();
  });

  db.on('reconnect', function(){
    console.log('MongoDB succesfully reconnected');
  });
});
