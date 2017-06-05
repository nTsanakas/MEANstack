//Retrieve the database
var db = require('../models/db');

/*GET a user segmentation selecting by username and timestamp*/
module.exports.loadSegmentationByUserTime = function(req, res, next) {
  if (req.params && req.params.username && req.params.timestamp) {
    try {
      db.read(user = req.params.username, null, null, null, null, date = req.params.timestamp, null, res = res);
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
  if (req.params.username && req.params.image) {
    //try {
      db.read(user = req.params.username, null, null, null, null, null, image = req.params.image, res = res);
      console.log("what's going on");

  /*  } catch (e) {
      res.status(500);
      res.json({"message":"Database error."});
    }*/
  } else {
    res.status(404);
    res.json({"message":"Missing parameter."});
  }
};

/*GET all segmentations selecting by image and timestamp*/
module.exports.loadSegmentationByImageTime = function(req, res, next) {
  if (req.params && req.params.image && req.params.timestamp) {
    try {
      db.read(null, null, null, null, null, date = req.params.timestamp, image = req.params.image, res = res);
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
