const Category = require('../model/categoryModel')

const CategoryController = {
    getAll: async (req,res) => {
        try {
            let data = await Category.find({})
                res.status(200).json({ length: data.length, categories: data})
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    getSingle: async (req,res) => {
        try {
            let data = await Category.findById({ _id: req.params.id })

            res.status(200).json({ category: data})

        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    create: async (req,res) => {
        try {
           const { title, desc } = req.body;
           
           let extCat = await Category.findOne({ title })
                if(extCat) 
                    return res.status(400).json({ msg: "Category already exists."})
            
            let data = await Category.create({ title, desc })

           res.json({ msg: "Category created successfully", category: data })

        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    update: async (req,res) => {
        try {
            const { title, desc, isActive } = req.body
            
            let extCat = await Category.findById({ _id: req.params.id })
                if(!extCat)
                    return res.status(400).json({ msg: "Category doesn't exists."})
                
              await Category.findByIdAndUpdate({ _id: req.params.id }, { title, desc, isActive })

                res.status(200).json({ msg: "Category updated successfully"})

        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req,res) => {
        try {
             
            let extCat = await Category.findById({ _id: req.params.id })
                if(!extCat)
                    return res.status(400).json({ msg: "Category doesn't exists."})
                
           await Category.findByIdAndDelete({ _id: req.params.id })
            return res.status(200).json({ msg: "Category deleted successfully"})

        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = CategoryController