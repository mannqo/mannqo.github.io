const Koa = require('koa');
// const compose = require('koa-compose');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');


// 连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:5000/koa_mine')
    .then(() => { console.log('Mongodb Connected..'); })
    .catch(err => { console.log(err); })

const app = new Koa();
const router = new Router();

router.get("/", async ctx => {
    ctx.body = { msg: "Hello koa Interfaces" };
})

// 引入 提交文章 接口
const { login, register } = require('./controller/login');
const { getArticles, postArticle } = require('./controller/article');


router.post("/register", register);
router.post("/login", login);
router.get('/users/getArticle', getArticles);
router.post('/users/postArticle', postArticle);


// 配置路由
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});