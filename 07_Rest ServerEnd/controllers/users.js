const bcryptjs = require('bcryptjs');
const {
    response,
    request
} = require('express');
const User = require('../models/usermg')
//READ
const usersGet = async (req = request, res = response) => {
    const {
        limit = 5, from = 0
    } = req.query;
    const query = {
        state: true
    }
    // const users = await User.find(query)
    //     .skip(from)
    //     .limit(limit);
    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(from)
        .limit(limit)
    ])

    res.json({
        total,
        users
    })

}
//UPDATE
const usersPut = async (req = request, res = response) => {
    const {
        id
    } = req.params;
    const {
        _id,
        google,
        pass,
        ...all
    } = req.body;

    //validate vs Db
    if (pass) {
        const salt = bcryptjs.genSaltSync();
        all.pass = bcryptjs.hashSync(pass, salt);
    }
    const user = await User.findByIdAndUpdate(id, all);

    res.json({
        user
    })
}
//CREATE
const usersPost = async (req, res = response) => {
    const {
        name,
        email,
        pass,
        rol
    } = req.body;
    const user = new User({
        name,
        email,
        pass,
        rol
    })
    //encrypt pass
    const salt = bcryptjs.genSaltSync();
    user.pass = bcryptjs.hashSync(pass, salt);
    //record db
    await user.save();

    res.json({
        user
    })
}
const usersDelete = async (req, res = response) => {
    const {
        id
    } = req.params;
    // fisic delete
    // const user = await User.findByIdAndDelete( id );
    const user = await User.findByIdAndUpdate(id, {
        state: false
    });

    res.json({
        user
    })
}
const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    })
}
const users404 = (req, res = response) => {
    res.status(404).json({
        msg: `This route doesnt exist | 404`
    })
}
module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
    users404
}