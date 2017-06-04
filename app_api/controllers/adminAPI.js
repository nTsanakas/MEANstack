//Retrieve MongoDB
var db = require('../models/db');

/*GET a user segmentation selecting by username and timestamp*/
module.exports.loadSegmentationByUserTime = function(req, res, next) {
  var result;
  if (req.params && req.params.username && req.params.timestamp) {
    try {
      result = db.read(user = req.params.username, date = req.params.timestamp);
    } catch (e) {
      res.status(e);
      res.json({"message":"Database error."});
    }
  } else {
    res.status(404);
    res.json({"message":"Missing parameter."});
  }
  res.status(200);
  res.json(result);
};

/*GET a user segmentation selecting by username and image*/
module.exports.loadSegmentationByUserImage = function(req, res, next) {
  var result;
  console.log('loads seg');
  if (req.params && req.params.username && req.params.image) {
    try {
      result = db.read(user = req.params.username, image = req.params.image);
    } catch (e) {
      res.status(500);
      res.json({"message":"Database error."});
    }
  } else {
    res.status(404);
    res.json({"message":"Missing parameter."});
  }
  res.status(200);
  res.json(result);
};

/*GET all segmentations selecting by image and timestamp*/
module.exports.loadSegmentationByImageTime = function(req, res, next) {
  var result;
  if (req.params && req.params.image && req.params.timestamp) {
    try {
      result = db.read(image = req.params.image, dte = req.params.timestamp);
    } catch (e) {
      res.status(e);
      res.json({"message":"Database error."});
    }
  } else {
    res.status(404);
    res.json({"message":"Missing parameter."});
  }
  res.status(200);
  res.json({"result":"database error"});
  res.json(result);
};

/*DELETE a segmentation in the database*/
module.exports.deleteSegmentation = function(req, res, next) {
  if (req.params && req.params.username && req.params.timestamp) {
    try {
      db.delete(req.params.username, req.params.timestamp);
    } catch (e) {
      res.status(e);
      res.json({"message":"Database error."});
    }
  } else {
    res.status(404);
    res.json({"message":"Missing parameter."});
  }
  res.status(200);
  res.json({"status":"Delete successful."});
};
