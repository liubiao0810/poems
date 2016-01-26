/**
 * @file 根据ID请求数据接口
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-16
 */
var Poems = require('../models/poems');
module.exports = {
    init: function(app) {
        app.post('/findById', function(req, res) {
            var id = req.body.id;
            if (!!id) {
                Poems.findById(id, function(err, poem) {
                    if (err) {
                        console.log(err);
                    }
                    res.send(poem);
                });
            }else {
                res.send('参数错误!');
            }
        });
    }
};