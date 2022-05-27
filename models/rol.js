const { Schema, model } = require("mongoose");

const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, "Rol is required"]
    }
})

module.exports = model("Rol",RolSchema)