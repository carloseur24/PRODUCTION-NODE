const {
    response,
    request
} = require('express');
const Server = require('../models/server');

const usersGet = (req = request, res = response) => {
    const {
        q,
        name = 'Not name',
        age,
        page = 1,
        limit
    } = req.query;
    res.json({
        msg: 'get API - controller',
        q,
        name,
        age
    })
}
const usersPut = (req = request, res = response) => {
    const {
        id,
        name,
        age,
        page,
        limit
    } = req.params;
    res.json({
        msg: 'put API - controller',
        id
    })
}
const usersPost = (req, res = response) => {
    const {
        name,
        age
    } = req.body;
    res.json({
        msg: 'post API - controller',
        name,
        age
    })
}
const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
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