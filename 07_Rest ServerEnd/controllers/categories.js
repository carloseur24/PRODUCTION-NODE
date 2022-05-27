const {
    response
} = require("express");
const {
    Category
} = require('../models');

//get category - populate{}

const createCategory = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({
        name
    });
    if (categoryDB) {
        return res.status(400).json({
            msg: `The category ${categoryDB.name}, already exist`
        });
    }
    const data = {
        name,
        user: req.user._id
    }
    const category = new Category(data);
    //save in DB
    await category.save()
    res.status(201).json(category)
}
//get categories - paginate - total - populate.
const paginateTotal = async (req, res) => {
    const {
        limit = 5, from = 0
    } = req.query;
    const query = {
        state: true
    }
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({
        total,
        categories
    })
}
const getonly = async (req, res) => {
    const {
        id
    } = req.params
    const query = {
        state: true
    }
    const category = await Category.findById(id).populate('user', 'name')
    if (!category.state) {
        return res.status(400).json({
            msg: `${category.name} category, already doesn't exist`
        });
    }
    res.json({
        category
    })
}

//update category
const categoryUpdate = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            state, user,
            ...data
        } = req.body;
        data.name = data.name.toUpperCase();
        // data.user   = req.user.__id;
        const category = await Category.findByIdAndUpdate(id, data, {new: true}).populate('user', 'name');
        if (!category.state) {
            return res.status(400).json({
                msg: `${category.name} category, already doesn't exist`
            });
        }
        res.json({
            category
        })
    } catch (error) {
        throw new Error(error)
    }
}
//delete category
const categoryDelete = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const deletes = await Category.findByIdAndUpdate(id, {
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
    createCategory,
    getonly,
    paginateTotal,
    categoryUpdate,
    categoryDelete
}