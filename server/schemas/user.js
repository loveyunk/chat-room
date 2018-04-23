var mongoose = require('mongoose');

//用户的表的结构
module.exports = new mongoose.Schema({
    // 用户名
    username: {
        type: String,
        unique: true, // 不可重复约束
        require: true // 不可为空约束
    },
    // 密码
    password: {
        type: String,
        require: true // 不可为空约束
    },
    // 年龄
    age: Number,
    // 性别
    sex: String,
    token: {
        type: String
    }
});
