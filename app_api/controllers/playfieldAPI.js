//Retrieve MongoDB
var db = require('../models/db');

/*POST any segmentation data we need to save.*/
module.exports.saveSegmentations = function(req, res, next) {
  if (req.params && req.params.username && req.params.image) {
    try {
      sendJsonResponse(res, 201, db.update(req.params.username, req.params.image, req.body.points,
                req.body.transformationMatrix, req.body.shapeScore));
      //res.status(201);
      //res.json({"status":"saveSegs"});
    } catch (e) {
      res.status(e);
    }
  } else {
    sendJsonResponse(res, 404, {"message":"Missing parameter..."});
  }
};

/*GET the next image*/
module.exports.getNextImage = function(req, res, next) {
  try {
    //send the image as a response.
    //res.status(200);
    //res.json({"status":"NextImage"});
  } catch (e) {
    res.status(e);
  }
};
