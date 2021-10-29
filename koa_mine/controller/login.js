const md5 = require('md5');
const UserModel = require('../models/User');

// 注册
const register = async ctx => {
    const body = ctx.request.body;
    const { username, password } = body;
    const newUser = new UserModel({
        username,
        password: md5(password),
    })

    await UserModel.create(newUser)
        .then((newUser) => {
            console.log(111);
            if (newUser) {
                console.log(newUser);
                ctx.body = { msg: '注册成功' }
            }
        })
        .catch((err) => {
            ctx.body = { msg: '注册失败' }
        })

}

// 登录
const login = async ctx => {
    const body = ctx.request.body;
    const { username, password } = body;
    await UserModel.find({ username, password: md5(password) })
        .then((data) => {
            if (data.length) {
                ctx.body = { msg: '登录成功' };
            } else {
                ctx.body = { msg: '账号或密码错误' }
            }
        })
}


module.exports = {
    login,
    register,
};