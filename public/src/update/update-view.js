/**
 * @file 更新view层
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-16
 */
define(function(require, exports, module) {
    var newView = require('../new/new-view');
    var model = require('./update-model');
    var jsonLen = require('../../js/getJsonLength');
    var NumTocn = require('numTocn');
    var me;
    module.exports = {
        init: function() {
            me = this;
            var id = $('#poemsId').val();

            // 模板加载，不走ajax,会闪现
            this.render(id);
        },

        /**
         * render 渲染函数
         *
         * @param  {number} id 诗集ID
         *
         */
        render: function(id) {
            model.getData(id, function(data) {
                // 设置体裁
                if (data.writeType !== 1) {
                    $('[hook-name = poemsType]').val(data.writeType);
                }

                // 循环吐出诗集数据
                var lines = data.lines;
                var len = jsonLen.getLinesLength(lines);
                // 设置句数
                $('[hook-name = linesLen]').val(len);
                // var html = me.ininHtml(lines);
                // $('[hook-name = lines]').html(html);

                // 设置中文字
                var cnLineArr = $('[hook-name = cnLine]');
                for (var i = 0; i< cnLineArr.length; i++) {
                    var cnLine = NumTocn.numTocn(cnLineArr.eq(i).attr('hook-val') - 0);
                    cnLineArr.eq(i).html(cnLine);
                }
                newView.init();
            });
        },

        /**
         * ininHtml 获取lines  html
         *
         * @param  {object} lines lines  独享
         *
         * @return {string}  返回html
         */
        ininHtml: function(lines) {
            var linesArr = [];
            for (var item in lines) {
                linesArr.push(lines[item]);
            }
             return me.returnHtml(linesArr);
        },

        /**
         * returnHtml 转换lines为html
         *
         * @param  {Array} arr lines转化后的数组
         *
         * @return {stirng}    返回html
         */
        returnHtml: function(arr) {
            var html = '';
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                var linNum = i + 1;
                cnLine = NumTocn.numTocn(linNum);
                html += ''
                    + '<div class="form-group">'
                    + '    <label class="col-sm-2 control-label" for="input-' + linNum + '">第' + cnLine + '句</label>'
                    + '    <div class="col-sm-10 width-100_82">'
                    + '        <input type="text" class="form-control" required value="'
                    + arr[i] + '" name="poems[lines][poem_'
                    + linNum
                    + ']" id="input-' + linNum + '">'
                    + '    </div>'
                    + '</div>';
            }
            html += '<div hook-name="new-lines"></div>';
            return html;
        }
    };
});