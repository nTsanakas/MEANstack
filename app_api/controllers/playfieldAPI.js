//Retrieve MongoDB
var db = require('../models/db');

/*POST any segmentation data we need to save.*/
module.exports.saveSegmentations = function(req, res, next) {
  console.log("Got here");
  if (req.params && req.params.username && req.params.image) {
    var object = JSON.parse(Object.keys(req.body)[0]);
    console.log("Got here 2");

    console.log(object);

    try {
      db.update(req.params.username, req.params.image, object.points,
                object.transformationMatrix, object.shapeScore, null, res);
    } catch (e) {
      console.log("Oopsi");
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
