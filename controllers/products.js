const {
    response
} = require("express");
const {
    Product,
    Category
} = require('../models');

//get category - populate{}

const createProduct = async (req, res = response) => {
    try {
        const {
            category,
            name,
            state,
            user,
            ...body
        } = req.body
        category.toUpperCase();
        name.toUpperCase();
        // res.status(400).json(categories)
        const productDB = await Product.findOne({
            name
        });
        if (productDB) {
            return res.status(400).json({
                msg: `The product ${productDB.name}, already exist`
            });
        }
        const data = {
            ...body,
            name,
            category,
            user: req.user._id
        }
        const product = new Product(data);
        //save in DB
        await product.save()
        res.status(201).json(product)
    } catch (error) {
        throw new Error(error)
    }
}
//get categories - paginate - total - populate.
const paginateTotal = async (req, res) => {
    const {
        limit = 5, from = 0
    } = req.query;
    const query = {
        state: true
    }
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ])
    res.json({
        total,
        products
    })
}
const getonly = async (req, res) => {
    const {
        id
    } = req.params
    const query = {
        state: true
    }
    const product = await Product.findById(id).populate('user', 'name')
    if (!product.state) {
        return res.status(400).json({
            msg: `${product.name} category, already doesn't exist`
        });
    }
    res.json({
        product
    })
}

//update category
const ProductUpdate = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            state,
            user,
            ...data
        } = req.body;
        if (data.name){   
            data.name = data.name.toUpperCase();
        }
        data.user= req.user._id

        // data.user   = req.user.__id;
        const product = await Product.findByIdAndUpdate(id, data, {
            new: true
        }).populate('user', 'name');
        if (!product.state) {
            return res.status(400).json({
                msg: `${product.name} product, already doesn't exist`
            });
        }
        res.json({
            product
        })
    } catch (error) {
        throw new Error(error)
    }
}
//delete category
const ProductDelete = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const deletes = await Product.findByIdAndUpdate(id, {
            state: false
        });
        res.json({
            deletes,
            msg: 'Delete succesfull'
        })
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    createProduct,
    getonly,
    paginateTotal,
    ProductUpdate,
    ProductDelete
}