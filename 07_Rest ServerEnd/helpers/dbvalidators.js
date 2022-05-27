const {
    request
} = require('express')
const {
    Category,
    Rol,
    User,
    Product
} = require('../models')

const rolvalidator = async (rol = '') => {
    const existRol = await Rol.findOne({
        rol
    })
    if (!existRol) {
        throw new Error(`Rol ${rol} dosen't exist in data base`)
    }
}

const emailvalidator = async (email = '') => {
    const ifemail = await User.findOne({
        email
    });
    if (ifemail) {
        throw new Error(`This email ${email} already exist `)
    }
}
const uservalidator = async (id) => {
    const ifuser = await User.findById(
        id
    );
    if (!ifuser) {
        throw new Error(`This user ${id} doesn't exist `)
    }
}
const categoryvalidator = async (id) => {
    const ifcategory = await Category.findById(
        id
    );
    if (!ifcategory) {
        throw new Error(`This Category ${id} doesn't exist `)
    }
}
const productvalidator = async (id) => {
    const ifproduct = await Product.findById(
        id
    );
    if (!ifproduct) {
        throw new Error(`This Product ${id} doesn't exist `)
    }
}
module.exports = {
    productvalidator,
    categoryvalidator,
    rolvalidator,
    emailvalidator,
    uservalidator
};