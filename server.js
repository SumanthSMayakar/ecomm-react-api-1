const express = require('express')
require('dotenv').config()

const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./db')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')

const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(fileUpload({
    useTempFiles: true
}))

mongoose.Promise = global.Promise;

app.use(cookieParser(process.env.COOKIE_SECRET)) // to enable the signed cookies
app.use(cors())

app.use(`/api/v1/`, require('./route/authRoute'))
app.use(`/api/v1/product/`, require('./route/productRoute'))
app.use(`/api/v1/category/`, require('./route/categoryRoute'))
app.use(`/api/v1/image/`, require('./route/imageRoute'))
app.use(`/api/v1/order/`, require('./route/orderRoute'))

app.all('*', (req,res,next) => {
    res.status(404).json({ msg: `requested path not found, try '/api/v1/'`})
    next()
})

app.listen(PORT, async () => {
    await connectDb(process.env.MONGO_URL)
    console.log(`server is started @ http://localhost:${PORT}`)
})
