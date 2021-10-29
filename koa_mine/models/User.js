const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('user', UsersSchema);