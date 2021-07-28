const mongoose = require('mongoose');

const launchesSchema = mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    target: {
        // type: mongoose.isValidObjectId,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Planet',
        // ref: 'Planet',
    },
    customers: [ String ],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    }
});

const exported = mongoose.model('Launch', launchesSchema);

module.exports = exported;