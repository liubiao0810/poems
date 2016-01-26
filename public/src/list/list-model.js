/**
 * @file listmodel
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-18
 */
define(function(require, exports, module) {
    module.exports = {

        /**
         * init 初始化
         *
         */
        init: function() {
            
        },

        delPoem: function(id, cb) {
            $.ajax({
                type: 'DELETE',
                url: '/admin/list?id=' + id
            })
            .done(function(results) {
                cb && cb(results);
            });
        }
    };
});