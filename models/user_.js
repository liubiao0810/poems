// 顶会议用户组件
var mongoose = require("mongoose");
var users = mongoose.createConnection('mongodb://127.0.0.1:27017/users');
// 链接错误
users.on('error', function(error) {
  console.log(error);
});
// Schema 结构
// 创建模型
var Schema = mongoose.Schema;
// 定义了一个新的模型，但是此模式还未和users集合有关联
var userScheMa = new Schema({
    userId: String,
    userName: String,
    password: String
});
// 与users集合关联
exports.users = mongoose.model('users', userScheMa);

exports.users = users;