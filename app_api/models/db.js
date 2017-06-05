//Provide access to the database from outside this file.
var mDB;

//MongoDB connection URI
var user = user //Can be user or admin atm.
var dbURI = 'mongodb://localhost:27017/exampleDb';
var olURI = 'mongodb://user:12345@ds111461.mlab.com:11461/pixano';

//If moved to a deifferent provider, make sure to set NODE_ENV accordingly.
if (process.env.NODE_ENV === 'production') {
  dbURI = olURI;
}

//Retrieve MongoDB Client.
var mongoClient = require('mongodb').MongoClient;

//Acting as constant to set the collection we are using.
var COLLECTION = 'production';

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

//Connect the database
mongoClient.connect(dbURI, function(err, db) {
  if(!err) {
    console.log("MongoDB connected");
  }

  mDB = db;

  var collection = db.createCollection(COLLECTION);

  db.collection(COLLECTION, function(err,collection){
    collection.insert({ "_id" : "user1408", "p" : 123456, "s" : 238, "n" : 3,
      "seg" : [ { "p" : [ [ 840, 451 ], [ 853, 454 ], [ 856, 440 ], [ 837, 432 ], [ 834, 444 ] ],
      "tm" : [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], "i" : "http://beispiel.com",
      "s" : 85, "d" : new Date() } ] });
    collection.count(function (err, count) {
      if (err) throw err;
    });
    collection.find().toArray(function(err, documents){
      console.log(documents);
    });
  });

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

//Define CRUD operations, to be masked in the controllers.
//They are kept generalized, but do not allow everything.
module.exports.create = function(user,password, res) {
  user = user || null;
  password = password || null;

  if (user === null || password === null) throw 400;

  mDB.collection(COLLECTION, function(err, collection){
    collection.insert({"_id":user, "p":password, "s":0, "n":0,"seg":[]});
    res.status(201);
  });
}

//Generic function for reading from the database.
//Future me, collapse for ease of reading ctrl code.
module.exports.read = function(user, score, numberOfSegs, transformationMatrix, shapeScore, date, image, res) {

  var result,
      curse;

  //We do not need all parameters, plan accordingly.
  user = user || null;
  score = score || null;
  numberOfSegs = numberOfSegs || null;
  transformationMatrix = transformationMatrix || null;
  shapeScore = shapeScore || null;
  date = date || null;
  image = image || null;

  var myMatch1 = {};
  if (user !== null) myMatch1._id = user;
  if (score !== null) myMatch1.s = {$gte: score};
  if (numberOfSegs !== null) myMatch1.n = {$gte: numberOfSegs};

  var myMatch2 = {};
  if (transformationMatrix !== null) myMatch2['seg.tm'] = transformationMatrix;
  if (shapeScore !== null) myMatch2['seg.s'] = {$gte : shapeScore};
  if (date !== null) myMatch2['seg.d ']= {$gte : date};
  if (image !== null) myMatch2['seg.i'] = image;

  console.log("db myMatch2: ");
  console.log(myMatch2);
  console.log(myMatch1);

  if (JSON.stringify(myMatch2) !== JSON.stringify({})) {
    console.log("wtf just checked");
    mDB.collection(COLLECTION, function(err, collection) {
      collection.aggregate([
        {$match : myMatch1},
        {$project : {seg:1}},
        {$unwind : '$seg'},
        {$match : myMatch2}
      ]).toArray(function(err, documents){
        console.log("These are the big aggregation docs: ");
        console.log(documents);
        res.status(200);
        res.json(documents);
      });
    });
  } else {
    mDB.collection(COLLECTION, function(err,collection) {
      collection.aggregate([
        {$match : myMatch1},
        {$project : {seg:0}}
      ]).toArray(function(err, documents){
        console.log("These are the aggregation docs: ");
        console.log(documents);
        res.status(200);
        res.json(documents);
      });
    });
  }
}


module.exports.update = function(user, image, points, transformationMatrix, shapeScore, date, res) {
  console.log("Got here 3");
  user = user || null;
  image = image || null;
  points = points || null;
  transformationMatrix = transformationMatrix || null;
  shapeScore = shapeScore || null;
  date = date || new Date();

  console.log("Got here 4"+user+image+points+transformationMatrix+shapeScore+date);
  if (user === null || image === null || points === null || transformationMatrix === null || shapeScore === null)
    throw 400;
  console.log("Got here 5"+user+image+points+transformationMatrix+shapeScore+date);

  mDB.collection(COLLECTION, function(err, collection) {
    console.log("Got here 6"+user+image+points+transformationMatrix+shapeScore);
    collection.update({"_id":user},
    {$inc: {"n":1, "s":shapeScore},
    $addToSet: {"seg":{"p":points, "tm":transformationMatrix, "s":shapeScore, "d":date}}});
    res.status(200);
    res.json({"status":"savedSeg"});
  });
}

//To delete a segmentation without knowing the date, find the segmentation, extract the date, then use this.
module.exports.delete = function(user, date, res) {
  user = user || null;
  date = date || null;

  if (user === null) throw 400;

  if (date === null) {
    mDB.collection(COLLECTION, function(err, collection){
      collection.remove({"_id":user},{justOne:true});
      res.status(200);
      res.json({"status":"User deletion successful."});
    });
  } else {
    mDB.collection(COLLECTION, function(){
      collection.update({"_id":user}, {$pull: {"seg":{"d":date}}});
      res.status(200);
      res.json({"status":"Deleted successfully."});
    });
  }
}

//Get a random? image from the gridFS.
module.exports.getGridImg = function() {

}
