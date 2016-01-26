/**
 * @file 诗集录入页model
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-06
 */
define(function(require, exports, module) {
    module.exports = {
        init: function() {
        
        },

        waterFallModel: function(pagesize, n, cb) {
            var pagesize = pagesize || 10;
            var n = n || 1;
            $.ajax({
                type: 'post',
                url: '/waterFall',
                data: { 
                    pagesize: pagesize,
                    n: n
                },
                success: function (data) {
                    cb && cb(data);
                }
            });
        }
    };
});