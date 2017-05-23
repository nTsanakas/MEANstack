var express = require('express');
var router = express.Router();
var ctrlPlayfield = require('../controllers/playfieldAPI');
var ctrlAdmin = require('../controllers/adminAPI');

//Playfield
router.post('/playfield/:username/:image', ctrlPlayfield.saveSegmentations);
router.get('/playfield', ctrlPlayfield.getNextImage);

//Admin
router.get('/admin/:username/time/:timestamp', ctrlAdmin.loadSegmentationByUserTime);
router.get('/admin/:username/img/:image', ctrlAdmin.loadSegmentationByUserImage);
router.get('/admin/time/:timestamp/img/:image', ctrlAdmin.loadSegmentationByImageTime);
router.delete('/admin/del/:username/time/:timestamp', ctrlAdmin.deleteSegmentation);

module.exports = router;
