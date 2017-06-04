//Retrieve MongoDB
var db = require('../models/db');

/*POST any segmentation data we need to save.*/
module.exports.saveSegmentations = function(req, res, next) {
  console.log("Got here");
  if (re.params && req.params.username && req.params.image) {
    try {
      db.update(req.params.username, req.params.image, req.body.points,
                req.body.transformationMatrix, req.body.shapeScore);
      res.status(201);
      res.json({"status":"savedSeg"});
    } catch (e) {
      console.log(e);
      res.status(e);
      res.json({"status":"Database error."});
    }
  } else {
    res.status(404);
    res.json({"status":"Missing parameter."});
  }
};

/*GET the next image*/
module.exports.getNextImage = function(req, res, next) {
  console.log('Getting next image');
  try {
    //TODO: load the image on response?

  } catch (e) {
    res.status(e);
  }
  res.status(200);
  res.json({"status":"NextImage"});
};
