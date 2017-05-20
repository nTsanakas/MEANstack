/* GET home page */
module.exports.homelist = function(req, res, next) {
  res.render('playfield-list', { title: 'Home'});
};

/* GET playfield info page */
module.exports.playfieldInfo = function(req, res, next) {
  res.render('playfield-info', { title: 'Playfield Info'});
};

/* GET Add comments page */
module.exports.addcomments = function(req, res, next) {
  res.render('playfield-comments-form', { title: 'Add comments'});
}
