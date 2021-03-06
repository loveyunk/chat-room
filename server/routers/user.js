const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken'); // 使用jwt签名
const formidable = require('formidable');
var path = require('path');
var qiniu = require('qiniu');

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
            sex: userInfo.sex,
            avatar: userInfo.avatar
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
            sex: userInfo.sex,
            avatar: userInfo.avatar
        };
        res.json(responseData);
    });
});

// 发送图片
router.post('/sendimg', (req, res, next) => {
    let imgname = null;
    let form = new formidable.IncomingForm();
    form.uploadDir = 'public/images';
    form.keepExtensions = true;
    // form.maxFieldSize = 2*1024*1024;

    form.parse(req, (err, fields, files) => {
        // res.send(imgname);
        console.log(files);
        res.json({a: path.join(__dirname, files.file.path)});
    });
    // form.on('fileBegin', (name, file) => {
    //     file.path = path.join(__dirname, `../public/images/${file.name}`);
    //     imgname = file.name;
    // });
});

// 七牛token
router.get('/token', (req, res, next) => {
    // 七牛上传
    const accessKey = '427X8jzc9TcUsSfs2utJLwYkIKBXKyGaXpR6u4WW';
    const secretKey = 'T3c3cJSTjhJ-A4UJ04_xL5fOvuJssCplFs80jBG8';
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    let options = {
        scope: 'chatroom',
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)","age":$(x:age)}'
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    res.json({
        token: uploadToken
    });
});

// 修改头像
router.post('/avatar', (req, res, next) => {
    let _id = req.body.id;
    let avatar = req.body.avatar;
    console.log(_id);
    console.log(avatar);

    User.findOne({
        _id
    }).then(userInfo => {
        if (!userInfo) {
            responseData.error = 30009;
            responseData.message = '用户不存在';
            res.json(responseData);
            return;
        }
        let whereData = {_id};
        let updateDat = {$set: {"avatar": avatar}}; //如果不用$set，替换整条数据
        User.update(whereData, updateDat, function (error, result) {
        });

        responseData.message = '头像修改成功';
        responseData.data = avatar;
        res.json(responseData);
    });
});

module.exports = router;
