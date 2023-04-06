const Order = require('../model/orderModel')

const getRandomNum = () => {
    return Math.round(Math.random() * 1000000)
}

const orderController = {
    getAll: async (req,res) => {
        try {
            let data = await Order.find()
                return res.status(200).json({ length: data.length, orders: data})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getCurrentOrders: async (req,res) => {
        try {
            const id = req.user // read the order of current user

            let data = await Order.find()
            let currentOrders = data.filter((item) => item.user._id === id)
            return res.status(200).json({ length: currentOrders.length, orders: currentOrders})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createOrder: async (req,res) => {
        try {
            const { user, cart, address, payMode } = req.body
            const id = getRandomNum()

            let newOrder = await Order.create({
                orderCode: id,
                user,
                cart,
                address,
                payMode
            })

            res.status(200).json({ msg: "Order placed successfully", order: newOrder })
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteOrder: async (req,res) => {
        try {
             let id = req.params.id
            let extOrder = await Order.findById({_id: id})
                if(!extOrder)
                    return res.status(404).json({ msg: "No order id exists."})
            await Order.findByIdAndDelete({ _id: id})

            res.status(200).json({ msg: "Order deleted successfully"})
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    cancelOrder: async (req,res) => {
        try {
             let id = req.params.id
             let { orderStatus } = req.body

            let extOrder = await Order.findById({_id: id})
                if(!extOrder)
                    return res.status(404).json({ msg: "No order id exists."})

            await Order.findByIdAndUpdate({ _id: id}, { orderStatus })

           if(orderStatus == false) {
                res.status(200).json({ msg: "Order cancelled successfully"})
           } else {
                res.status(200).json({ msg: "Congrats, Your order revoked successfully"})
           }
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = orderController