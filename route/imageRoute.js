const imageRoute = require('express').Router()
const imageContrller = require('../controller/imageController')

imageRoute.post(`/upload`, imageContrller.upload)
imageRoute.post(`/destroy`, imageContrller.destroy)

module.exports = imageRoute