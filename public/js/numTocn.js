/**
 * @file 数字转换为汉字数字
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-01-06
 */
define(function(require, exports, module) {
    module.exports = {
        /**
         * numTocn 数字转换为汉字数字
         *
         * @param  {number} num 
         *
         * @return {type}   返回转换后的汉字数字
         */
        numTocn: function(num) {
            var num = num - 0;
            if (num > 1000000000000000000) {
                alert("您输入的数字太大，重新输入！");
                return;
            }
            num += '';
            num = num.split('').reverse();
            var len = num.length;
            var monval = "";
            var bitSignificance = '';
            var firstNum = '';
            for (var i = 0; i < len; i++) {
                bitSignificance = num[i] != 0 ? this.to_mon(i) : '';
                firstNum = num[i] != 0 ? this.to_upper(num[i]) : '';
                monval = monval + bitSignificance + firstNum;
            }
            monval = monval.split('').reverse().join('');
            return monval;
        },

        to_upper: function(a) {
            switch (a) {
                case '0':
                    return '零';
                    break;
                case '1':
                    return '壹';
                    break;
                case '2':
                    return '贰';
                    break;
                case '3':
                    return '叁';
                    break;
                case '4':
                    return '肆';
                    break;
                case '5':
                    return '伍';
                    break;
                case '6':
                    return '陆';
                    break;
                case '7':
                    return '柒';
                    break;
                case '8':
                    return '捌';
                    break;
                case '9':
                    return '玖';
                    break;
                default:
                    return '';
            }
        },

        to_mon: function(a) {
            switch (a) {
                case 1:
                    return '拾';
                    break;
                case 2:
                    return '佰';
                    break;
                case 3:
                    return '仟';
                    break;
                default:
                    return '';
                    break;
            }
        }
    }
});