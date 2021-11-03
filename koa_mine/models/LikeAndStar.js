const mongoose = require('mongoose');

const LikeAndStarSchema = mongoose.Schema({
    ObjectId: {
        type: Number,
        required: true,
    },
    articleId: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('likeAndStar', LikeAndStarSchema);