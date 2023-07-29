
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    mobile_no :{type:Number,required:true},
    address :{type:String,required:true },
    cart: {type: Object, required: true},
    paymentType: { type: String, default: 'COD'},
    status: { type: String, default: 'order_placed'},
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema);