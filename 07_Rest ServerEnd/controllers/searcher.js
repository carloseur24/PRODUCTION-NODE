const {
    response,
    request
} = require('express');
const {
    ObjectId
} = require('mongoose').Types;
const {
    Category,
    Product,
    User
} = require('../models')

const enablecollections = [
    'users',
    'categories',
    'products',
    'roles'
]

const search_users = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : ['result does not found']
        });
    }
    const regex = new RegExp(term, 'i')
    const users = await User.find({
        $or: [{
            name: regex
        }, {
            email: regex
        }],
        $and: [{
            state: true
        }]
    });
    const ansers = await User.count({
        $or: [{
            name: regex
        }, {
            email: regex
        }],
        $and: [{
            state: true
        }]
    });
    res.json({
        term,
        similars: ansers,
        results: users
    })
}
const search_categories = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const category = await Category.findById(term)
        return res.json({
            results: (category) ? [category] : ['result does not found']
        });
    }
    const regex = new RegExp(term, 'i')
    const categories = await Category.find({
        name: regex,
        state: true
    });
    const ansers = await Category.count({
        name: regex,
        state: true
    });
    res.json({
        term,
        similars: ansers,
        results: categories
    })
}
const search_products = async (term = '', res = response) => {
    const category = await Category.findById(term)
    if (category) {
        const product = await Product.find({
            category: term
        })
        const anser = await Product.count({
            category: term
        })
        return res.json({
            results: (product) ? [term, anser, product] : ['result does not found in producs2'],
        });
    }
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const product = await Product.findById(term)
            .populate('category', 'name');
        const anser = await Product.count({
            _id: term
        })
        return res.json({
            results: (product) ? [{
                term: term, anser: anser
            }, product] : ['result does not found in producs'],
        });
    }
    const regex = new RegExp(term, 'i')
    const products = await Product.find({
            name: regex,
            state: true
        })
        .populate('category', 'name');
    const ansers = await Product.count({
        name: regex,
        state: true
    });
    res.json({
        term,
        similars: ansers,
        results: products
    })
}

const search = (req = request, res = response) => {
    const {
        collection,
        term
    } = req.params

    if (!enablecollections.includes(collection)) {
        return res.status(400).json({
            msg: `${collection} doesn't enable to search, use: ${enablecollections}`
        })
    }
    switch (collection) {
        case 'users':
            search_users(term, res)
            break;
        case 'categories':
            search_categories(term, res)
            break;
        case 'products':
            search_products(term, res)
            break;

        default:
            res.status(500).json({
                msg: 'This search have not been done'
            })
            break;
    }
}
module.exports = search;