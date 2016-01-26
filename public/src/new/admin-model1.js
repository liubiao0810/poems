/**
 * @file 诗集录入页model
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-06
 */
define(function(require, exports, module) {
    var lineArr = [];
    module.exports = {

        /**
         * setData 设置添加诗集行数html
         *
         * @param {number} lineNum  第几行
         * @param {string} lineHtml 第几行的html
         */
        setData: function(lineNum, lineHtml, callBack) {
            var len = lineArr.length;
            if (lineNum - 4 > len) {
                lineArr.push(lineHtml);
            }else {
               lineArr.pop();
            }
            window.localStorage.html = lineArr;
            window.localStorage.lineNum = ~~lineNum;
            callBack && callBack();
        },

        /**
         * getData 获取诗集添加的行数的总html
         *
         * @return {Object} 返回存储的数据
         */
        getData: function() {
            return window.localStorage;
        }
    };
});