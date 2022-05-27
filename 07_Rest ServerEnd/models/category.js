const {
    Schema,
    model
} = require("mongoose");

const CategoriesSchema = Schema({
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
    }
})
CategoriesSchema.methods.toJSON = function () {
    const {
        __v,
        name, _id,state,
        ...category
    } = this.toObject();
    category.name = name.toUpperCase();
    category.Category_id = _id;
    return category;
}
module.exports = model("Category", CategoriesSchema)