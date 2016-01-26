/**
 * @file 诗集录入页view
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-06
 */
define(function(require, exports, module) {
    var AdminModel = require('./new-model');
    var initLineNum = 4;
    var lineNum = 5;
    var newLinesNum = 0;
    var cnLine = '伍';
    var _this;
    module.exports = {

        /**
         * init 初始化函数
         */
        init: function() {
            var lineHtml = '';
            _this = this;
            initLineNum = $('[hook-name = linesLen]').val() - 0;
            lineNum = $('[hook-name = linesLen]').val() - 0 + 1;
            // 如果内存存在数据则把内存中的数据写入
            // if(!!LocalStorage.htmlArr) {
            //     this.render();
            // }
            // add一联
            $('[hook-name = add-line]').on('click', function() {
                if (lineNum > 68) {
                    swal("不能再添加拉~~!最多添加到68行~~");
                    return;
                }
                _this.addLine();
            });
            // del一联
            $('[hook-name = delete-line]').on('click', function() {
                if (lineNum <= initLineNum + 1) {
                    swal("不能再删除啦~~!");
                    return;
                }
                // 确定删除插件
                swal({
                    title: "您确定要删除最后一行吗？",
                    // text: "您确定要删除这条数据？", 
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "是的，我要删除",
                    confirmButtonColor: "#ec6c62"
                }, function() {
                        _this.delLine();
                });
            });
            $('[type = submit]').click(function() {
                AdminModel.submit();
            });
            // 刷新提示
            document.body.onbeforeunload = function (e) {
                e = e || window.event;
                if (/webkit/.test(navigator.userAgent.toLowerCase())) {
                    return"离开页面将导致数据丢失！";
                }else {
                    e.returnValue ="离开页面将导致数据丢失！";
                }
            }
        },

        /**
         * render 渲染函数
         */
        render: function(lineArr) {
            var html = lineArr.join('');
            $('[hook-name = new-lines]').html(html);
        },

        /**
         * addLine 添加一行
         */
        addLine: function() {
            AdminModel.setData(initLineNum, ++newLinesNum, function(lineArr) {
                _this.render(lineArr);
                lineNum++;
            });
        },

        /**
         * delLine 删除最后一行
         *
         */
        delLine: function() {
            AdminModel.setData(initLineNum, --newLinesNum, function(lineArr) {
                _this.render(lineArr);
                lineNum--;
                // 删除成功后关闭弹窗
                swal.close();
            });
        }
    }
});