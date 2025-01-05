const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    images: [String], // Array of image filenames or URLs
});

module.exports = mongoose.model('testimages', productSchema);
