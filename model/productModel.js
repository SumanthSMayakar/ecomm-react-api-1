const mongoose = require('mongoose')

const ProductModel = new mongoose.Schema({
        productCode: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: Object,
            required: true
        },
        brand: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        discount: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        },
        sold: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            required: true
        }
},{
    collection: "products",
    timestamps: true
})

module.exports = mongoose.model("Product", ProductModel)