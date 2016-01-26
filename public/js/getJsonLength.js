/**
 * @file 获取一层json数据中的长度
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-016
 */
define(function(require, exports, module) {
    module.exports = {
        getLinesLength: function(json) {
            var jsonlength = 0;
            for(var item in json){
                jsonlength++;
            }
            return jsonlength;
        }
    };
});