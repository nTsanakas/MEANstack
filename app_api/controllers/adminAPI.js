//Retrieve MongoDB
var db = require('../models/db');

/*GET a user segmentation selecting by username and timestamp*/
module.exports.loadSegmentationByUserTime = function(req, res, next) {

  res.status(200);
};

/*GET a user segmentation selecting by username and image*/
module.exports.loadSegmentationByUserImage = function(req, res, next) {
  res.status(200);
};

/*GET all segmentations selecting by image and timestamp*/
module.exports.loadSegmentationByImageTime = function(req, res, next) {
  res.status(200);
};

/*DELETE a segmentation in the database, not yet sure how to scheck selection*/
module.exports.deleteSegmentation = function(req, res, next) {
  res.status(204);
};
