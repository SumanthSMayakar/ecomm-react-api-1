const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderCode:{
        type: String
    },
    user: {
        type: Object,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    payMode: {
        type: String,
        required: true,
        trim: true
    },
    payStatus: {
        type: String,
        default: ""
    },
    payId: {
        type: String,
        default: ""
    },
    orderStatus: {
        type: Boolean,
        default: true
    }
},{
    collection: "orders",
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)