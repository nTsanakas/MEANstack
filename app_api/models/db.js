//Provide access to the database from outside this file.
var mDB;

//Acting as global constant to set the collection we are using.
var COLLECTION = 'production';

var validArgument = function(arg) {
  if (arg !== null) return arg;
}
//Define CRUD operations, to be masked in the controllers.
//They are kept generalized, but do not allow everything.
module.exports.create = function(user,password) {
  user = user || null;
  password = password || null;

  if (user === null || password === null) throw 400;

  mDB.collection(COLLECTION).insert({"_id":user, "p":password, "s":0, "n":0,"seg":[]});
}

module.exports.read = function(user, score, numberOfSegs, transformationMatrix, shapeScore, date, image) {
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
  if (transformationMatrix !== null) myMatch2.seg.tm = transformationMatrix;
  if (shapeScore !== null) myMatch2.seg.s = {$gte : shapeScore};
  if (date !== null) myMatch2.seg.d = {$gte : date};
  if (image !== null) myMatch2.seg.i = image;

  if (myMatch2 !== {}) {
    return mDB.collection(COLLECTION).aggregate([
      {$match : myMatch1},
      {$project : {seg:1}},
      {$unwind : '$seg'},
      {$match : myMatch2}
    ]).toArray();
  } else {
    return mDB.collection(COLLECTION).aggregate([
      {$match : myMatch1},
      {$project : {seg:0}}
    ]).toArray();
  }
}

module.exports.update = function(user, image, points, transformationMatrix, shapeScore, date) {
  user = user || null;
  image = image || null;
  points = points || null;
  transformationMatrix = transformationMatrix || null;
  shapeScore = shapeScore || null;
  date = date || new Date();

  if (user === null || image === null || points === null || transformationMatrix === null || shapeScore === null)
    throw 400;

  mDB.collection(COLLECTION).update({"_id":user},
    {$inc: {"n":1, "s":shapeScore},
    $addToSet: {"seg":{"p":points, "tm":transformationMatrix, "s":shapeScore, "d":date}}});

}

//To delete a segmentation without knowing the date, find the segmentation, extract the date, then use this.
module.exports.delete = function(user, date) {
  user = user || null;
  date = date || null;

  if (user === null) throw 400;

  if (date === null) {
    mDB.collection(COLLECTION).remove({"_id":user},{justOne:true});
  } else {
    mDB.collection(COLLECTION).update({"_id":user}, {$pull: {"seg":{"d":date}}});
  }
}

//Get a random? image from the gridFS.
module.exports.getGridImg = function() {

}

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

  mDB = db;

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
