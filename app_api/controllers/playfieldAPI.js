//Retrieve MongoDB
var db = require('../models/db');

/*POST any segmentation data we need to save.*/
module.exports.saveSegmentations = function(req, res, next) {
  res.status(201);
};

/*GET the next image*/
module.exports.getNextImage = function(req, res, next) {
  res.status(200);
};
