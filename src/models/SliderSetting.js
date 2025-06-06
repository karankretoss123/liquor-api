// src/models/SliderSetting.js

const mongoose = require('mongoose');

const sliderSettingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        image: {
            url: {
                type: String,
                required: [true, 'Image URL is required'],
            },
            _id: {
                type: String,
                required: [true, 'Image ID is required'],
            },
            blurDataURL: {
                type: String,
                required: [true, 'Blur placeholder is required'],
            },
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required'],
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
            required: [true, 'Subcategory is required'],
        },
    },
    { timestamps: true }
);

const SliderSetting =
    mongoose.models.SliderSetting ||
    mongoose.model('SliderSetting', sliderSettingSchema);

module.exports = SliderSetting;
