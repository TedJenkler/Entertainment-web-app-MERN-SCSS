const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    favorite_count: {
        type: Number,
        default: 0
    },
    item_count: {
        type: Number,
        default: 0
    },
    iso_639_1: {
        type: String,
        default: "en"
    },
    poster_path: {
        type: String,
        default: null
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    mediaid: []
});

const List = mongoose.model('List', listSchema);

module.exports = List;