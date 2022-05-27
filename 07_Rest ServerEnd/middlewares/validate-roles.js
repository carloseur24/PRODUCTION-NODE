const {
    response
} = require("express");
const rol = require("../models/rol");

const isAdmin = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: "You have to validate your token before to verify your rol"
        })
    }
    const {
        rol,
        name
    } = req.user;

    if (rol !== 'ADMMIN_ROLE') {
        return res.status(500).json({
            msg: `${name} isnt Admin - You cant do this`
        });
    }

    next()
}

const haveRole = (...roles)=>{
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: "You have to validate your token before to verify your rol"
            })
        }
        if(!roles.includes(req.user.rol)){
            return res.status(500).json({
                msg: `This service require these rols: ${roles}`
            })
        }
        next()
    }
}

    module.exports = {
        isAdmin,
        haveRole
    }