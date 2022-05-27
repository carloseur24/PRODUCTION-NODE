const {
    Router
} = require('express');
const {
    check,
} = require('express-validator');
const {
    campval
} = require('../middlewares/validator')
const {
    validatejwt,
    isAdmin,
    haveRole
} = require('../middlewares');
const {
    createProduct,
    paginateTotal,
    getonly,
    ProductUpdate,
    ProductDelete
} = require('../controllers/products');
const {
    categoryvalidator,
    productvalidator
} = require('../helpers/dbvalidators');
const router = Router();
const notid = `This id doenn't exist`

// get all categories - public
router.get('/', paginateTotal);
// get a categories for id- public
router.get('/:id', [
    check('id', notid).isMongoId(),
    check('id').custom(productvalidator),
    campval
], getonly);
// create a new categories - private
router.post('/', [
    validatejwt,
    check('name', 'Create a product require a name').not().isEmpty(),
    check('category', 'Select a category to advance').not().isEmpty(),
    check('category', notid).isMongoId(),
    check('category', 'This category does not exist').custom(categoryvalidator),
    campval
], createProduct);
// update any info - if you hava a valid token
router.put('/:id', [
    validatejwt,
    check('id', 'This Product does not exist').custom(productvalidator),
    campval
], ProductUpdate);
// delete any category - admin
router.delete('/:id', [
    validatejwt,
    isAdmin,
    check('id', notid).custom(productvalidator),
    campval
], ProductDelete);

module.exports = router;