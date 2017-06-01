//Retrieve MongoDB
var db = require('../models/db');

/*GET a user segmentation selecting by username and timestamp*/
module.exports.loadSegmentationByUserTime = function(req, res, next) {
  if (req.params && req.params.username && req.params.timestamp) {
    try {
      sendJsonResponse(res, 200, db.load(user = req.params.username, date = req.params.timestamp));
      //res.status(200);
      //res.json({"status":"UserTime"});
    } catch (e) {
      sendJsonResponse(res, e, {"message":"Database error..."});
    }
  } else {
    sendJsonResponse(res, 404, {"message":"Missing parameter..."});
  }
};

/*GET a user segmentation selecting by username and image*/
module.exports.loadSegmentationByUserImage = function(req, res, next) {
  if (req.params && req.params.username && req.params.image) {
    try {
      sendJsonResponse(res, 200, db.load(user = req.params.username, image = req.params.image));
      //res.status(200);
      //res.json({"status":"UserTime"});
    } catch (e) {
      sendJsonResponse(res, e, {"message":"Database error..."});
    }
  } else {
    sendJsonResponse(res, 404, {"message":"Missing parameter..."});
  }
};

/*GET all segmentations selecting by image and timestamp*/
module.exports.loadSegmentationByImageTime = function(req, res, next) {
  if (req.params && req.params.image && req.params.timestamp) {
    try {
      sendJsonResponse(res, 200, db.load(image = req.params.image, dte = req.params.timestamp));
      //res.status(200);
      //res.json({"status":"UserTime"});
    } catch (e) {
      sendJsonResponse(res, e, {"message":"Database error..."});
    }
  } else {
    sendJsonResponse(res, 404, {"message":"Missing parameter..."});
  }
};

/*DELETE a segmentation in the database, not yet sure how to scheck selection*/
module.exports.deleteSegmentation = function(req, res, next) {
  if (req.params && req.params.username && req.params.timestamp) {
    try {
      sendJsonResponse(res, 204, db.delete(req.params.username, req.params.timestamp));
      //res.status(200);
      //res.json({"status":"UserTime"});
    } catch (e) {
      sendJsonResponse(res, e, {"message":"Database error..."});
    }
  } else {
    sendJsonResponse(res, 404, {"message":"Missing parameter..."});
  }
};
