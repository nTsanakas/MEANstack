var express = require('express');
var router = express.Router();
var ctrlPlayfield = require('../controllers/playfield');
var ctrlOthers = require('../controllers/others');
var ctrlAdmin = require('../controllers/admin');

/* Playfield pages */
router.get('/', ctrlPlayfield.homelist);
router.get('/playfield', ctrlPlayfield.playfieldInfo);
router.get('/admin/list', ctrlAdmin.adminlist);
router.get('/admin', ctrlAdmin.admin);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
