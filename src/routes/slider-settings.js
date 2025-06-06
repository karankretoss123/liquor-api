const express = require('express');
const router = express.Router();
const verifyToken = require('../config/jwt');
const { addSliderSetting, getAllSliderSettings, getSliderSettingById, deleteSliderSetting, updateSliderSetting } = require('../controllers/slider-settings');

router.post('/admin/slider-setting', verifyToken, addSliderSetting);
router.get('/admin/slider-setting', verifyToken, getAllSliderSettings);
router.get('/admin/slider-setting/:id', verifyToken, getSliderSettingById);
router.delete('/admin/slider-setting/:id', verifyToken, deleteSliderSetting);
router.put('/admin/slider-setting/:id', verifyToken, updateSliderSetting);

module.exports = router;
