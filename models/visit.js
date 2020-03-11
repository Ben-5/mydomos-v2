var mongoose = require('mongoose');

var visitInfoSchema = mongoose.Schema({
    date:      Date,
    time :     String,
    price:     Number,
    duration:  String,
    lang:      String,
    opt:       [String],
    stock:     Number,
    maxStock:  Number,
});

var visitAddressSchema = mongoose.Schema({
    street:     String,
    zip:        Number,
    city:       String,
    country:    String,
});

var visitSchema = mongoose.Schema({
    ref:        String,
    title:      String,
    desc:       String,
    place:      String,
    host:       String,
    rate:       Number,
    isRmv:      Boolean,
    cover:      String,
    pics:       [String],
    slider:     String,
    info:       [visitInfoSchema],
    address:    visitAddressSchema,
});

var visitModel = mongoose.model('visits', visitSchema);

module.exports = visitModel;