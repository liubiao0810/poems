/**
 * @file 路由设置
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-03
 */
var Poems = require('../models/poems');
var _ = require('underscore');
module.exports = {

    /**
     * init 路由初始化
     *
     * @param  {object} app express
     *
     */
    init: function(app){
        var me = this;
        /* GET index page. */
        app.get('/', function(req, res){
            Poems.fetch(function(err, poems) {
                if (err) {
                    console.log(err);
                }
                res.render("index", {
                    title: '花开半春入了夏',
                    poems: poems
                });
            });
        });

        /* GET admin page. */
        app.get('/admin/poems', function(req, res){
            // 登陆拦截
            me.checkLogin(req, res);
            var poems = {};
            res.render('new', {
                title: '诗集录入',
                poems: poems
            });
        });

        // admin post poems
        app.post('/admin/poems/new', function(req, res) {
            // 登陆拦截
            me.checkLogin(req, res);

            var id = req.body.poems._id;
            var poemsObj = req.body.poems;
            var _poems;
            if (id !== 'undefined') {
                Poems.findById(id, function(err, poems) {
                    if (err) {
                        console.log(err);
                    }
                    _poems = _.extend(poems, poemsObj);
                    _poems.save(function(err, poems) {
                        if (err) {
                            console.log(err);
                        }
                        res.redirect('/poems/' + poems._id);
                    });
                });
            } else {
                var _poemsObj = poemsObj;
                delete _poemsObj._id;
                // 添加作者
                _poems = new Poems(_poemsObj);
                _poems.support = 0;
                _poems.save(function(err, poems) {
                    if (err) {
                        console.log(err);
                    }

                    res.redirect('/poems/' + poems._id);
                });
            }
        });

        /* GET admin update poems */
        app.get('/admin/poems/update/:id', function(req, res) {
            // 登陆拦截
            me.checkLogin(req, res);

            var id = req.params.id;
            console.log('updating ', id);

            if (id) {
                Poems.findById(id, function(err, poem) {
                    res.render('update', {
                        title: poem.poemsTitle,
                        poem: poem
                    });
                });
            }else {
                res.redirect('admin');
            }
        });

        /* GET list page. */
        app.get('/admin/list', function(req, res){
            // 登陆拦截
            me.checkLogin(req, res);
            Poems.fetch(function(err, poems) {
                if (err) {
                    console.log(err);
                }
                res.render("list", {
                    title: '诗集列表',
                    poems: poems
                });
            });
        });

        /* GET detail page. */
       app.get('/poems/:id', function(req, res){
            var id = req.params.id;
            Poems.findById(id, function(err, poem) {
                if (err) {
                    console.log(err);
                }
                res.render('poems', {
                    title: poem.poemsTitle,
                    poem: poem
                });
            });
        });

        /* GET login page. */
        app.get('/login', function(req, res){
            res.render('login', {title: '欢迎登陆《花开半春入了夏》'});
        });

        /* POST doLogin page. */
        app.post('/login', function(req, res){
            var user = {
                userName: '花夏',
                passWord: '',
                regTime: '2016-01-01'
            };
            if(req.body.userName == user.userName && req.body.passWord == user.passWord){
                req.session.user = user;
                return res.redirect('/home');
            }else {
                req.session.error='用户名或密码不正确';
                return res.redirect('/login');
            }
        });

        /* GET logout page. */
        app.get('/logout', function(req, res){
            req.session.user = null;
            res.render('logout', {title: '正在退出...'});
        });

        /* GET home page. */
        app.get('/home', function(req, res){
            // 登陆拦截
            me.checkLogin(req, res);

            res.render('home', { title: '欢迎登陆《花开半春入了夏》'});
        });

        app.delete('/admin/list', function(req, res) {
            var id = req.query.id;
            console.log("deleting ", id);

            if (id) {
                Poems.remove({"_id": id}, function(err, poem) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            success: 1
                        });
                    }
                });
            }
        });
    },

    //登录拦截器
    checkLogin: function (req, res) {
        var url = req.originalUrl;
        if (url != "/login" && !req.session.user) {
            return res.redirect("/login");
        }
    }
};