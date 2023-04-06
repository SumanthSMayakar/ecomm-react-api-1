const Product = require('../model/productModel')


const ProductController = {
    getAll: async (req,res) => {
        try {
            let data = await Product.find()

            return res.status(200).json({ length: data.length, products: data })
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    getSingle: async (req,res) => {
        try {
           let data = await Product.findById({ _id: req.params.id })
                if(!data)
                    return res.status(404).json({ msg: "Product doesn't exists."})

                res.status(200).json({ product: data })
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    create: async (req,res) => {
        try {

            const { productCode } = req.body

            let extProduct = await Product.findOne({ productCode })
                if(extProduct)
                    return res.status(400).json({ msg: "Product already exists."})

            let newProduct = await Product.create(req.body)

            res.json({ msg: "New Product Created Successfully", product: newProduct })

        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    update: async (req,res) => {
        try {
            
        let data = await Product.findById({ _id: req.params.id })
            if(!data)
                return res.status(404).json({ msg: "Product doesn't exists."})
            
        let updated = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body)

            res.status(200).json({ msg: "Product updated successfully", product: updated })

        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req,res) => {
        try {
            let data = await Product.findById({ _id: req.params.id })
                if(!data)
                    return res.status(404).json({ msg: "Product doesn't exists."})

                await Product.findByIdAndDelete({ _id: req.params.id })

                return res.status(200).json({ msg: "Product deleted succcessfully"})
            
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = ProductController