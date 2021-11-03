const md5 = require('md5');
const UserModel = require('../models/User');

// 注册
const register = async ctx => {
    const { username, password } = ctx.request.body;

    const user = await UserModel.find({});
    const userId = user.length + 1;

    const newUser = new UserModel({
        userId,
        username,
        password: md5(password),
    })

    try {
        const createRes = await UserModel.create(newUser);
        if (newUser) {
            console.log(newUser);
            ctx.body = { status: 0, msg: '注册成功' }
        }
    } catch (err) {
        ctx.body = { status: 1, msg: '注册失败' }
    }
}

// 登录
const login = async ctx => {
    const body = ctx.request.body;
    const { username, password } = body;

    try {
        const data = await UserModel.updateOne({ username, password: md5(password) }, { status: 0 });
        console.log(data);
        if (data.modifiedCount) {
            ctx.body = { status: 0, msg: '登录成功', userId: data.userId };
        } else if (!data.matchedCount) {
            ctx.body = { status: 1, msg: '账号或密码错误', userId: data.userId };
        } else {
            ctx.body = { status: 1, msg: '你已经登录了', userId: data.userId };
        }
    } catch (err) {
        if (err) {
            ctx.body = { status: 1, msg: '未知错误' }
        }
    }
}

// 退出登录
const logout = async ctx => {
    const { username } = ctx.request.body;
    try {
        const data = await UserModel.updateOne({ username }, { status: 1 });
        console.log(data);
        if (data.modifiedCount) {
            ctx.body = { status: 0, msg: '登出成功' };
        } else if (!data.matchedCount) {
            ctx.body = { status: 1, msg: '找不到该用户' };
        } else {
            ctx.body = { status: 1, msg: '你还未登录' };
        }
    } catch (err) {

    }
}

// 查看登录状态
const getLoginStatus = async ctx => {
    const { username } = ctx.query;
    const result = await UserModel.findOne({ username });
    console.log(result);
    if (result) {
        ctx.body = { status: result.status, msg: '0表示登录, 1表示未登录' }
    } else {
        ctx.body = { msg: '你还没注册呢' };
    }
}

// 获取用户信息
const getPersonInfo = async ctx => {
    const { userId } = ctx.query;
    await UserModel.find({ userId })
        .then((data) => {
            console.log(data);
            if (data.length) {
                ctx.body = { status: 0, ...data[0]._doc }
            } else {
                ctx.body = { status: 1, msg: '请求失败' }
            }
        })
}


module.exports = {
    login,
    logout,
    register,
    getLoginStatus,
    getPersonInfo
};