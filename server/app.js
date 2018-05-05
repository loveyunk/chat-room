/*
* 应用程序启动（入口）文件
* */
// 加载express模块
var express = require('express');
// 处理各种路径的模块
var path = require('path');
var logger = require('morgan'); // 命令行log显示
var cookieParser = require('cookie-parser');
// 加载body-parser,用来处理post提交过来的数据
var bodyParser = require('body-parser');
// 加载数据库模块
const mongoose = require('mongoose');

// 创建app应用 =>NodeJs Http.creatServer()
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 开启socket.io
var server = app.listen(3001);
var io = require('socket.io').listen(server);

// socket.io
let userList = {};

let privateUserList = {};

let userSocket = {};

io.on('connection', function (socket) {
    // 每个用户都会被分配一个唯一的socket.id
    let socketID = socket.id;

    // 当有用户加入的时候，socket会发起三个广播，分别是
    // 向自己，把uid发送给自己
    // 向除自己外的其他人，选择他们有新用户加入
    // 向所有人，更新用户列表
    socket.on('enter', function (info) {
        userSocket[socketID] = socket; // 把socket存到全局数组里面去
        userList[socketID] = Object.assign({}, info, {uid: socketID});
        // 向建立该连接的客户端广播
        socket.emit('uid', socketID);
        // 除自己
        socket.broadcast.emit('enterUser', {username: userList[socketID].username, type: 'ENTER_MESSAGE'});
        // 所有人
        io.emit("updateUserList", userList);
    });

    // 私聊用户列表
    socket.on('privateList', function (from, to, username, userInfo) {
        // console.log(userInfo);
        privateUserList[from] = Object.assign({}, userInfo, {uid: from});
        if (to in userSocket) {
            userSocket[to].emit('updatePrivateList', from, username, privateUserList);
        }
    });

    // 一对一
    socket.on('privateMessage', function (from, to, messages) {
        if (to in userSocket) {
            userSocket[to].emit('updatePrivateMessage', from, messages);
            userSocket[from].emit('updatePrivateMessage', to, messages);
        }
    });

    socket.on('updateMessages', function (messages) {
        io.emit('updateMessages', messages);
    });

    socket.on('sendImg', (data) => {
        data.id = socket.id;
        io.emit('receiveImg', data);
    });

    socket.on('leave', function (uid) {
        if (userList.hasOwnProperty(uid)) {
            socket.broadcast.emit('leaveUser', {username: userList[uid].username, type: 'LEAVE_MESSAGE'});
            delete userList[uid];
            delete userSocket[uid];
            delete privateUserList[uid];
        }

        socket.broadcast.emit("updateUserList", userList);
        socket.disconnect(true);
    });

    socket.on('disconnect', function () {
        if (userList.hasOwnProperty(socketID)) {
            socket.broadcast.emit('leaveUser', userList[socketID].username);
            delete userList[socketID];
            delete privateUserList[socketID];
            delete userSocket[socketID];
        }

        socket.broadcast.emit("updateUserList", userList);
    });
});


// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//允跨域访问，所有页面
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.send(200); // 让options请求快速返回
    }
    else {
        next();
    }
});


/*
 * 根据不同的功能划分模块
 * */

app.use('/', require('./routers/index'));
app.use('/users', require('./routers/users'));
app.use('/user', require('./routers/user'));

//连接数据库
mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        //监听http请求
        // app.listen(8088);
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
