/**
 * @file 更新model层
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-16
 */
define(function(require, exports, module) {
    module.exports = {

        /**
         * getData 根据诗集ID获取对象
         *
         * @param  {number}   id 诗集ID
         * @param  {Function} cb 回调函数
         *
         */
        getData: function(id, cb) {
            $.ajax({
                type: 'post',
                url: '/findById',
                data: {
                    id: id
                },
                success: function(data) {
                    cb && cb(data);
                }
            });
        }
    };
});