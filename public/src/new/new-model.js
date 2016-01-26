/**
 * @file 诗集录入页model
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-06
 */
define(function(require, exports, module) {
    var lineArr = [];
    var NumTocn = require('numTocn');
    module.exports = {

        /**
         * setData 设置添加诗集行数html
         *
         * @param {number} lineNum  第几行
         * @param {string} lineHtml 第几行的html
         */
        setData: function(initLineNum, newLinesNum, callBack) {
            var _this = this;
            var len = lineArr.length;
            if (_this.getLinesNum() === 0) {
                if (newLinesNum > 0){
                    lineArr.push(_this.lineHtml(newLinesNum + initLineNum));
                }else {
                    lineArr.pop();
                }
                
            }else {
                if (newLinesNum > len) {
                    lineArr = _this.getLinesDataArr(initLineNum);
                    lineArr.push(_this.lineHtml(newLinesNum + initLineNum));
                }else {
                   lineArr.pop();
                }
            }
            callBack && callBack(lineArr);
        },

        /**
         * getData 获取诗集添加的行数的总html
         *
         * @return {Object} 返回存储的数据
         */
        getData: function() {
            return window.localStorage;
        },

        /**
         * getLinesDataArr 获取所有新增行的数据数组
         *
         * @return {Array} 返回值为所有新增行的数据数组
         */
        getLinesDataArr: function(initLineNum) {
            var _this = this;
            var newLineArr = [];
            var newLinesParent = $('[hook-name = new-lines]');
            var newline = newLinesParent.children('div');
            var newlineLen = newLinesParent.children('div').length;
            var  newLinesHtml = '';
            for (var i = 0; i < newlineLen; i++) {
                var newLineVal = newline.eq(i).find('input').val();
                var LineHtml = _this.lineHtml(i + initLineNum + 1, newLineVal);
                newLineArr.push(LineHtml);
            }
            return newLineArr;
        },

        /**
         * getLinesNum 获取新加行的行数
         *
         * @return {Number} 返回新加行的行数
         */
        getLinesNum: function() {
            var newLinesParent = $('[hook-name = new-lines]');
            return newLinesParent.children('div').length;
        },

        /**
         * getNewLineArrLen 获取数据数组长度
         *
         * @return {type} 返回数据数组长度
         */
        getNewLineArrLen: function() {
            return lineArr.length;
        },

        /**
         * lineHtml 初始化新加一行的数据
         *
         * @param  {number} lineNum 行号
         *
         * @return {string} 返回新加一行的html
         */
        lineHtml: function(newLineNum, val) {
            cnLine = NumTocn.numTocn(newLineNum);
            val = val || '';
            lineHtml = '<div class="form-group">'
                        + '<label class="col-sm-2 control-label" for="input-' + newLineNum + '">第' + cnLine + '句</label>'
                        + '<div class="col-sm-10 width-100_82">'
                            + '<input type="text" class="form-control" required value="' + val +'" name="poems[lines][poem_' + newLineNum + ']" id="input-' + newLineNum + '">'
                        + '</div>'
                    + '</div>';
            return lineHtml;
        },

        /**
         * submit 诗集提交事件
         *
         * @return {type} description
         */
        submit: function() {
            // 刷新提示
            document.body.onbeforeunload = function () {
                // 去除浏览器刷新提示
                return;
            }
        }
    };
});