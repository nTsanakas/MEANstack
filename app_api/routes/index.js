var express = require('express');
var router = express.Router();
var ctrlPlayfield = require('../controllers/playfieldAPI');
var ctrlAdmin = require('../controllers/adminAPI');

//Playfield
router.post('/playfield/:username/:image', ctrlPlayfield.saveSegmentations);
router.get('/playfield', ctrlPlayfield.getNextImage);

//Admin
router.get('/admin/ut/:username/:timestamp', ctrlAdmin.loadSegmentationByUserTime);
router.get('/admin/ui/:username/:image', ctrlAdmin.loadSegmentationByUserImage);
router.get('/admin/ti/:timestamp/:image', ctrlAdmin.loadSegmentationByImageTime);
// router.delete('/admin/del/:username/:timestamp', ctrlAdmin.deleteSegmentation);

module.exports = router;
