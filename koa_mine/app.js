const Koa = require('koa');
const cors = require('koa2-cors');
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
const { login, register, getPersonInfo, getLoginStatus, logout } = require('./controller/login');
const { getArticles, postArticle, likeArticle } = require('./controller/article');

// 登录注册
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/getLoginStatus", getLoginStatus);

router.get('/users/getArticle', getArticles);
router.post('/users/postArticle', postArticle);
router.get('/getPersonInfo', getPersonInfo);
// 用户点赞、收藏
router.post('/likeArticle', likeArticle);

app.use(cors());

// 配置路由
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});