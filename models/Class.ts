const mongoose = require('mongoose')

// schema for time object
const TimeSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    days: { // days of the week class is offered
        type: [String],
        required: true,
    },
})

// schema for class object
const ClassSchema = new mongoose.Schema({
    subjectCode: { // eg MATH
        type: String,
        required: true,
    },
    catalogNumber: { // eg 136
        type: String,
        required: true,
    },
    time: { // time object
        type: TimeSchema,
        required: true,
    },
    buildingCode: { // eg RCH
        type: String,
        required: true,
    },
    roomNumber: { // eg 306
        type: Number,
        required: true,
    },
})
module.exports = mongoose.model('Class', ClassSchema);
