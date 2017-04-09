/* GET home page */
module.exports.homelist = function(req, res, next) {
  res.render('index', { title: 'Home'});
};

/* GET location info page */
module.exports.locationInfo = function(req, res, next) {
  res.render('index', { title: 'Location Info'});
};

/* GET Add review page */
module.exports.addReview = function(req, res, next) {
  res.render('index', { title: 'Add Review'});
}
