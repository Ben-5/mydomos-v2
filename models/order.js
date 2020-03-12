var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    quantity: Number,
    visitId: String,
    slotId: String,
    cover: String,
    title: String,
    price: Number,                       
});

var ordersSchema = mongoose.Schema({
    orderRef:       Number,
    orderDate:      Date,
    orderTotal:     Number,
    orderVisits:    [orderSchema],
});

var orderModel = mongoose.model('orders', ordersSchema);

module.exports = orderModel;