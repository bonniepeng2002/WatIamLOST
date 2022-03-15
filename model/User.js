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

module.exports = mongoose.model('User', userSchema);