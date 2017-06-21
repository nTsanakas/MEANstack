//Retrieve the database
var db = require('../models/db');

/*GET a user segmentation selecting by username and timestamp*/
module.exports.loadSegmentationByUserTime = function(req, res, next) {
  if (req.params && req.params.username && req.params.timestamp) {
    try {
      db.read(req.params.username, null, null, null, null, req.params.timestamp, null, res);
    } catch (e) {
      res.status(e);
      res.json({"message":"Database error."});
    }
  } else {
    res.status(404);
    res.json({"message":"Missing parameter."});
  }
};

/*GET a user segmentation selecting by username and image*/
module.exports.loadSegmentationByUserImage = function(req, res, next) {
  console.log('loads seg');
  console.log(req.params.username);
  console.log(req.params.image);

  if (req.params.username && req.params.image) {
    try {
      console.log('loading seg');
      db.read(req.params.username, null, null, null, null, null, req.params.image, res);
      // res.status(200);
      // res.jsonp({"bla":"ok"});
      console.log('should have loaded seg');
    } catch (e) {
      console.log('foo');
      res.status(e);
      res.json({"message":"Database error."});
    }
  } else {
    res.status(404);
    res.json({"message":"Missing parameter."});
  }
};

/*GET all segmentations selecting by image and timestamp*/
module.exports.loadSegmentationByImageTime = function(req, res, next) {
  if (req.params && req.params.image && req.params.timestamp) {
    try {
      db.read(null, null, null, null, null, req.params.timestamp, req.params.image, res);
    } catch (e) {
      res.status(e);
      res.json({"message":"Database error."});
    }
  } else {
    res.status(404);
    res.json({"message":"Missing parameter."});
  }
};

/*DELETE a segmentation in the database*/
module.exports.deleteSegmentation = function(req, res, next) {
  if (req.params && req.params.username && req.params.timestamp) {
    try {
      db.delete(req.params.username, req.params.timestamp, res);
    } catch (e) {
      res.status(e);
      res.json({"message":"Database error."});
    }
  } else {
    res.status(404);
    res.json({"message":"Missing parameter."});
  }
};
