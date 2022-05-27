const {
    response
} = require('express');
const User = require('../models/usermg');
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
    const {
        email,
        pass
    } = req.body;

    try {
        //verify if our user exist
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password isnt correct'
            })
        }
        //If user is active
        if (!user.state) {
            return res.status(400).json({
                msg: 'User / Password isnt correct: State False'
            })
        }
        //Verify password
        const validatePass = bcrypt.compareSync(pass, user.pass);
        if (!validatePass) {
            return res.status(400).json({
                msg: 'User / Password isnt correct: password incorrect'
            })
        }
        //generating JWT
        const token = await generateJwt(user.id);

        res.json({
            user,
            token,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Speaks with Admin'
        })
    }
}
module.exports = {
    login
}