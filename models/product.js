const {
    Schema,
    model
} = require("mongoose");

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    }
})
ProductSchema.methods.toJSON = function () {
    const {
        __v,
        name,
        _id,
        state,
        ...product
    } = this.toObject();
    product.name = name.toUpperCase();
    product.Product_id = _id;
    return product;
}
module.exports = model("Product", ProductSchema)