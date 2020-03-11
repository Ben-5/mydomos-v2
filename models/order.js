var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    orderNumber:    Number,
    orderDate:      Date,
    orderNbTickets: Number,
    orderTotal:     Number,
    orderVisits:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'visits' }],
});

var orderModel = mongoose.model('orders', orderSchema);

module.exports = orderModel;