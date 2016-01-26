/**
 * @file 瀑布流接口
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-15
 */
var Poems = require('../models/poems');
module.exports = {
    init: function(app) {
        app.post('/waterFall', function(req, res) {
            var pagesize = (req.body.pagesize || 10) - 0;
            var n = req.body.n - 0;
            if (!!n || !!pagesize) {
                Poems.find(function(err, poems) {
                    if (err) {
                        console.log(err);
                    }
                    data = poems;
                    res.send(data);
                }).skip(pagesize*(n-1)).limit(pagesize);
            }else {
                res.send('参数错误!');
            }
        });
    }
};