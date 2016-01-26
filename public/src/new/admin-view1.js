/**
 * @file 诗集录入页view
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-06
 */
define(function(require, exports, module) {
    var AdminModel = require('./admin-model');
    var NumTocn = require('numTocn');
    var LocalStorage = AdminModel.getData();
    var lineNum = LocalStorage.lineNum || 5;
    var cnLine = NumTocn.numTocn(lineNum) || '伍';
    var _this;
    module.exports = {

        /**
         * init 初始化函数
         */
        init: function() {
            var lineHtml = '';
            _this = this;

            // 如果内存存在数据则把内存中的数据写入
            if(!!LocalStorage.html) {
                this.render();
            }
            // add一联
            $('[hook-name = add-line]').on('click', function() {
                _this.addLine();
            });
            // del一联
            $('[hook-name = delete-line]').on('click', function() {
                _this.delLine();
            });
        },

        /**
         * render 渲染函数
         */
        render: function() {
            var htmlArr = LocalStorage.html.split(',');
            var html = htmlArr.join('');
            $('[hook-name = new-lines]').html(html);
        },

        /**
         * addLine 添加一行
         */
        addLine: function() {

            if (lineNum > 68) {
                alert('不能再添加拉~~');
                return;
            }
            console.log($('[hook-name = new-lines]').find('.form-group')[0]);
            AdminModel.setData(lineNum, _this.lineHtml(lineNum), function() {
                _this.render();
                lineNum++;
            });
        },

        delLine: function() {
            if (lineNum <= 5) {
                alert('不能再减少拉~~');
                return;
            }

            lineNum--;
            AdminModel.setData(lineNum, null, function() {
                _this.render();
            });
        },
        /**
         * lineHtml 初始化新加一行的数据
         *
         * @param  {number} lineNum 行号
         *
         * @return {string} 返回新加一行的html
         */
        lineHtml: function(lineNum) {
            cnLine = NumTocn.numTocn(lineNum)
            lineHtml = '<div class="form-group">'
                        + '<label class="col-sm-2 control-label" for="input-' + lineNum + '">第' + cnLine + '句</label>'
                        + '<div class="col-sm-10 width-100_82">'
                            + '<input type="text" class="form-control" required value="" name="poems[lines][poem_' + lineNum + ']" id="input-' + lineNum + '">'
                        + '</div>'
                    + '</div>';
            return lineHtml;
        }
    }
});