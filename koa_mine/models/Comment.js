const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    articleId: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
    },
    commentId: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        require: true
    },
    reply: {
        type: Array,   // 每个回复都有replyId, content, date 
        default: []
    },
    date: {
        type: String,
        default: Date.now(),
    }
})

module.exports = mongoose.model('allComment', CommentSchema);