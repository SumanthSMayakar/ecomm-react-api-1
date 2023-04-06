const orderRoute = require('express').Router()
const orderController = require('../controller/orderController')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

orderRoute.get(`/all`, auth, adminAuth, orderController.getAll)
orderRoute.get(`/current`, auth, orderController.getCurrentOrders)

orderRoute.post(`/place`, auth, orderController.createOrder)

orderRoute.delete(`/delete/:id`, auth, adminAuth, orderController.deleteOrder)

orderRoute.patch(`/cancel/:id`, auth, orderController.cancelOrder)

module.exports = orderRoute