/**
 * @file 接口入口文件
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-16
 */
var findById = require('./findById-api');
module.exports = {
    init: function(app) {
        findById.init(app);
    }
};