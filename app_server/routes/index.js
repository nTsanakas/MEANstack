var express = require('express');
var router = express.Router();
var ctrlPlayfield = require('../controllers/playfield');
var ctrlOthers = require('../controllers/others');

/* Playfield pages */
router.get('/', ctrlPlayfield.homelist);
router.get('/playfield', ctrlPlayfield.playfieldInfo);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
