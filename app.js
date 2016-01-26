var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var vue = require('vue');
var _ = require('underscore');
var Poems = require('./models/poems');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var routes = require('./routes');
var users = require('./routes/user');
// 瀑布流接口
// var waterFall = require('./api/waterfall-api');
var api = require('./api/init');
var SessionStore = require("session-mongoose")(express);
var store = new SessionStore({
    url: "mongodb://localhost/session",
    interval: 120000
});
mongoose.connect('mongodb://localhost:27017/poems');
var app = express();


// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views/page'));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
// 将ejs模板引擎更换为.html后缀名
app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');
// 站点favicon
app.use(express.favicon(path.join(__dirname, '/public/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.cookieSession({secret : 'poems.me'}));
app.use(express.session({
    secret : 'poems.me',
    store: store,
    cookie: { maxAge: 900000 }
}));

// 用户名密码错误提示
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = '';
    if (err) {
        res.locals.message = '<div class="alert alert-danger">' + err + '</div>';
    }
    next();
});
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
routes.init(app);
// waterFall.init(app);
api.init(app);
// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 启动及端口
http.createServer(app).listen(app.get('port'), function(){
    console.log('启动成功，端口为' + app.get('port'));
    console.log('主页地址：http://localhost:3000/');
});
/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;