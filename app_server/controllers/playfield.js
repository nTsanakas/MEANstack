/* GET home page */
module.exports.homelist = function(req, res, next) {
  res.render('playfield-list', { title: 'Home'});
};

/* GET playfield info page */
module.exports.playfieldInfo = function(req, res, next) {
  res.render('playfield-info', { title: 'Playfield Info'});
};
