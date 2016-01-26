/**
 * @file index页view
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-12
 */
define(function(require, exports, module) {
    var model = require('./index-model');
    require('../../js/cascade.js');
    module.exports = {
        init: function() {
            var me = this;
            $('[hook-name = poems-cont]').on('click', function() {
                var ele = $(this).parent()[0]
                me.reckonTransitionHeight($(this)[0], 618, function() {
                    $(window).trigger('resize.cascade');
                });
            });
            // a链接跳转不展开高度;
            $('[hook-name = poems-cont] a').on('click', function(e) {
                e = e || window.event;
                e.stopPropagation();
            });
            // 保留，后期做瀑布流用
            // this.waterFallView();
            $('#container').cascade();
        },

        /**
         * waterFallView 瀑布流view
         *
         */
        waterFallView: function() {
            model.waterFallModel(2, 1, function(data) {
                console.log(data);
            });
        },

        // 高度无缝动画方法
        reckonTransitionHeight: function(element, time, cb) {
            // time, 数值，可缺省
            if (typeof window.getComputedStyle == "undefined") return;
            
            var height = window.getComputedStyle(element).height;
            element.style.height = "auto";
            var targetHeight = window.getComputedStyle(element).height;
            element.style.height = height;
            var flag = false;
            setTimeout(function() {
                if (time) element.style.transition = "height "+ time +"ms";
                element.style.height = targetHeight;
                flag = true;
            }, 15);
            function isOut(){
                if(
                flag){
                    cb && cb();
                }else{
                    setTimeout(isOut,600);
                }
            }
            isOut();
        }
    };
});