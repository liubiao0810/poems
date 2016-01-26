var mongoose = require('mongoose');
var PoemSchema = require('../schemas/poems');

var Poems = mongoose.model('poems', PoemSchema);

module.exports = Poems;