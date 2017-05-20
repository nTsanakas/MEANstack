var express = require('express');
var router = express.Router();
var ctrlPlayfield = require('../controllers/playfieldAPI');
var ctrlAdmin = require('../controllers/adminAPI');

//Playfield
router.post('/playfield/:username/:image', ctrlPlayfield.saveSegmentations);
router.get('/playfield', ctrlPlayfield.getNextImage);

//Admin
router.get('/admin/:username/:timestamp', ctrlAdmin.loadSegmentationByUserTime);
router.get('/admin/:username/:image', ctrlAdmin.loadSegmentationByUserImage);
router.get('/admin/:image', ctrlAdmin.loadSegmentationByImageTime);
router.delete('/admin/:username/:timestamp', ctrlAdmin.deleteSegmentation);

module.exports = router;
