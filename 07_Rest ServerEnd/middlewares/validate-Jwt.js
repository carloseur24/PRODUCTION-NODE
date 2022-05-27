const {
    response,
    request
} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usermg')

const validatejwt = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'There isnt token in this request'
        })
    }
    try {
        const {
            uid
        } = jwt.verify(token, process.env.SECRETORPUBLICKEY)

        // read user, has to be same to current user uid
        const user = await User.findById(uid);
        if (!user){
            return res.status(401).json({
                msg: 'Token invalid - User doesnt exist'
            })
        }
        // verify if uid has true state
        // if(!user.state){
        //     return res.status(401).json({
        //         msg: 'Token isnt valid - User False'
        //     })
        // }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token isnt valid'
        })
    }
}

module.exports = {
    validatejwt
}