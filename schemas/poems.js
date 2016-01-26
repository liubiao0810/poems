var mongoose = require('mongoose');
var PoemScheMa = new mongoose.Schema({
    writer: String,
    support: Number,
    poemsTitle: String,
    writeDte: String,
    writeType: Number,
    lines: Object,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }

    }
});

PoemScheMa.pre('save', function (next) {

    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.updateAt = Date.now();
    }

    next();
});

PoemScheMa.statics = {
    fetch: function(cb){
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb){
        return this.findOne({_id: id}).exec(cb);
    }
};
module.exports = PoemScheMa;