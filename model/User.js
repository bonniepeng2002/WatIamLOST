const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // max: 255,
        // min: 6
    },
    password: {
        type: String,
        required: true,
        // max: 1024,

    }
})

const studySchema = new mongoose.Schema({
    hostUser: {
        type: String,
        required: true,
    },
    building: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true
    }



})

module.exports = mongoose.model('User', userSchema);