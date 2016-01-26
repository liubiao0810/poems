/**
 * @file listview
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-18
 */
define(function(require, exports, module) {
    var model = require('./list-model');
    module.exports = {

        /**
         * init 初始化
         *
         */
        init: function() {
            $('[hook-name = del]').on('click', function(e) {
                var target = $(e.target);
                var id = target.data('id');
                var tr = $('[hook-name = item-id-' + id + ']');
                var poemType = $(this).siblings('td:eq(1)').text();
                // 确定删除插件
                swal({
                    title: '确定删除这首' + poemType + '？',
                    // text: "您确定要删除这条数据？", 
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "删除",
                    confirmButtonColor: "#ec6c62"
                }, function() {
                    model.delPoem(id, function(results) {
                        if (results.success === 1) {
                            if (tr.length > 0) {
                                tr.remove();
                                swal('删除成功！');
                            }
                        }
                    });
                });
            });
        }
    };
});