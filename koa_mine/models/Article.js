const mongoose = require('mongoose');


const ArticleSchema = mongoose.Schema({
    articleId: {
        type: Number,
        require: true,
    },
    authorId: {
        type: Number,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        default: Date.now(),
    },
})

module.exports = mongoose.model("AllArticle", ArticleSchema, "allArticles");