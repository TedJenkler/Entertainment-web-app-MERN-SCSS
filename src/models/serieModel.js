const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    poster_path: {
        type: String,
        required: true,
        trim: true,
    },
    airingToday: {
        type: Boolean,
        default: false
    },
    onAir: {
        type: Boolean,
        default: false
    },
    popular: {
        type: Boolean,
        default: false
    },
    topRated: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Serie = mongoose.model('Serie', seriesSchema);

module.exports = Serie;