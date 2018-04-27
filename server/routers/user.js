const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken'); // 使用jwt签名

// 返回统一格式
let responseData;

router.use(function (req, res, next) {
    responseData = {
        error: 0,
        message: '',
        data: {}
    };
    next();
});

// 登录
router.post('/login', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        responseData.error = 1;
        responseData.message = '用户名和密码不能为空';
        res.json(responseData);
        return;
    }
    // 查询数据库中用户名和密码是否存在
    User.findOne({
        username,
        password
    }).then(userInfo => {
        // 数据库中未查询到信息 null
        if (!userInfo) {
            responseData.error = 30001;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        // 数据库中查询到信息
        responseData.message = '登录成功';
        let token = jwt.sign({...userInfo}, 'chat-room', {
            expiresIn: 60 * 60 * 24
        });
        responseData.token = token;
        responseData.data = {
            uid: userInfo._id,
            username: userInfo.username,
            sex: userInfo.sex
        };
        res.json(responseData);
    });
});

/*
* 注册
*   注册逻辑
*   1.用户名不能为空
*   2.密码不能为空
*
*   1、用户名是否已注册
*       数据库查询
*
* */
router.post('/register', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let sex = req.body.sex;
    // 用户名不能为空，不得超过20位
    if (username === '') {
        responseData.error = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    // 密码
    if (password === '') {
        responseData.error = 1;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    // 用户名是否已经注册，查询数据库
    User.findOne({
        username
    }).then(userInfo => {
        if (userInfo) {
            responseData.error = 30002;
            responseData.message = '用户名已被注册';
            res.json(responseData);
            return;
        }
        // 保存用户注册信息
        let user = new User({
            username,
            password,
            sex
        });
        user.save();
        responseData.message = '注册成功';
        res.json(responseData);
    });
});

// 刷新用户信息接口
router.get('/info', function (req, res) {
    let _id = req.query.uid;
    User.findOne({_id}).then(userInfo => {
        if (!userInfo) {
            responseData.error = '300';
            responseData.message = '用户id错误';
            res.json(responseData);
            return;
        }
        responseData.error = 0;
        responseData.message = '用户信息请求成功';
        responseData.data = {
            uid: userInfo._id,
            username: userInfo.username,
            sex: userInfo.sex
        };
        res.json(responseData);
    });
});

module.exports = router;
