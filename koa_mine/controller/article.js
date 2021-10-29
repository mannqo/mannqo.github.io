const articleModel = require('../models/Article');

// 提交文章
const postArticle = async ctx => {
    const body = ctx.request.body;
    const { authorId, title, content } = body;
    let articleId;
    await Article.find({})
        .then((article) => {
            articleId = article.length + 1;
            ctx.body = { status: 0, msg: "发送成功" };
        })
    const newArticle = new Article({
        articleId,
        authorId,
        title,
        content,
    })
    await Article.create(newArticle, (err, docs) => {
        if (!err) { console.log('插入成功', docs); }
        else { console.log(err); }
    })
}

// 获取用户写的文章
const getArticles = async ctx => {
    const { authorId } = ctx.query;
    await articleModel.find({ 'authorId': authorId })
        .then((article) => {
            if (article) {
                ctx.body = article;
            }
        })
}

module.exports = {
    getArticles,
    postArticle
};