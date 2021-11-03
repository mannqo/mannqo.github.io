const ArticleModel = require('../models/Article');
const LikeAndStar = require('../models/LikeAndStar');
const User = require('../models/User');


// 提交文章
const postArticle = async ctx => {
    const body = ctx.request.body;
    const { ObjectId, title, content } = body;
    let articleId;
    await ArticleModel.find({})
        .then((article) => {
            articleId = article.length + 1;
        })

    const newArticle = new ArticleModel({
        user: ObjectId,
        articleId,
        title,
        content,
    })

    // User.findOne({ user: `Object("${ObjectId}")"` }).then(res => { console.log('res', res); })

    try {
        const createRes = await ArticleModel.create(newArticle);
        if (createRes) {
            ctx.body = { status: 0, msg: '发送成功' };
        }
    } catch (err) {
        if (err) {
            ctx.body = { status: 1, msg: '发送失败' }
        }
    }

}

// 获取用户写的文章
const getArticles = async ctx => {
    const { authorId } = ctx.query;
    await ArticleModel.find({ authorId })
        .then((article) => {
            if (article) {
                ctx.body = article;
            }
        })
}

// 用户点赞
const likeArticle = async ctx => {
    const { userId, articleId, type } = ctx.query;
    const newDetail = new LikeAndStar({
        userId,
        articleId,
        type
    })
    try {
        await LikeAndStar.find({ newDetail })
            .then(async data => {
                if (!data.length) {
                    const newData = await LikeAndStar.create(newDetail);
                    if (newData) {
                        ctx.body = '点赞成功';
                    } else {
                        ctx.body = '点赞失败';
                    }
                } else {
                    ctx.body = '点赞失败';
                }
            })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getArticles,
    postArticle,
    likeArticle
};