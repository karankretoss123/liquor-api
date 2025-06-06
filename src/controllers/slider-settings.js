const SliderSetting = require('../models/SliderSetting');
const blurDataUrl = require('../config/getBlurDataURL');
const { getAdmin } = require('../config/getUser');

// @desc    Add a new slider setting
// @route   POST /api/slider-settings
const addSliderSetting = async (req, res) => {
    try {
        const admin = await getAdmin(req, res); // Optional: for auth

        const { image, ...body } = req.body;

        if (!image?.url || !image?._id) {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        const blurDataURL = await blurDataUrl(image.url);

        const newSlider = await SliderSetting.create({
            ...body,
            image: {
                ...image,
                blurDataURL,
            },
        });

        res.status(201).json({
            success: true,
            message: 'Slider setting created',
            data: newSlider,
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all slider settings
// @route   GET /api/slider-settings
const getAllSliderSettings = async (req, res) => {
    try {
        const sliders = await SliderSetting.find()
            .populate('category', 'slug name')
            .populate('subCategory', 'slug name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: sliders,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get single slider setting by ID
// @route   GET /api/slider-settings/:id
const getSliderSettingById = async (req, res) => {
    try {
        const slider = await SliderSetting.findById(req.params.id)

        if (!slider) {
            return res.status(404).json({ success: false, message: 'Slider not found' });
        }

        res.status(200).json({
            success: true,
            data: slider,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Delete slider setting by ID
// @route   DELETE /api/slider-settings/:id
const deleteSliderSetting = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({ success: false, message: 'Please provide id' });
        }
        const slider = await SliderSetting.findByIdAndDelete(req.params.id);

        if (!slider) {
            return res.status(404).json({ success: false, message: 'Slider not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Slider deleted successfully',
            data: slider,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Update slider setting by ID
// @route   PUT /api/slider-settings/:id
const updateSliderSetting = async (req, res) => {
    try {
        const admin = await getAdmin(req, res); // Optional: for auth

        const { image, ...body } = req.body;

        const slider = await SliderSetting.findById(req.params.id);

        if (!slider) {
            return res.status(404).json({ success: false, message: 'Slider not found' });
        }

        let updatedImage = slider.image;

        // If image is changed, reprocess it
        if (image?.url && image?._id && (image.url !== slider.image?.url || image._id !== slider.image?._id)) {
            const blurDataURL = await blurDataUrl(image.url);
            updatedImage = {
                ...image,
                blurDataURL
            };
        }

        const updatedSlider = await SliderSetting.findByIdAndUpdate(
            req.params.id,
            {
                ...body,
                image: updatedImage
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Slider updated successfully',
            data: updatedSlider
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


module.exports = {
    addSliderSetting,
    getAllSliderSettings,
    getSliderSettingById,
    deleteSliderSetting,
    updateSliderSetting
}