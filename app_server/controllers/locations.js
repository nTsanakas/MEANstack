/* GET home page */
module.exports.homelist = function(req, res, next) {
  res.render('locations-list', { title: 'Home'});
};

/* GET location info page */
module.exports.locationInfo = function(req, res, next) {
  res.render('location-info', { title: 'Location Info'});
};

/* GET Add comments page */
module.exports.addcomments = function(req, res, next) {
  res.render('location-comments-form', { title: 'Add comments'});
}
