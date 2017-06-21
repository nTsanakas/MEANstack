/* GET home page */
module.exports.adminlist = function(req, res, next) {
  res.render('admin-list', { title: 'Image List'});
};

/* GET playfield info page */
module.exports.admin = function(req, res, next) {
  res.render('admin', { title: 'Admin Info'});
};
