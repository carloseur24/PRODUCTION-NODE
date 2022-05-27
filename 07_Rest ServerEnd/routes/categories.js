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
    haveRole,
    isAdmin
} = require('../middlewares');
const {
    createCategory,
    paginateTotal,
    getonly,
    categoryUpdate,
    categoryDelete
} = require('../controllers/categories');
const {
    categoryvalidator,
    rolvalidator
} = require('../helpers/dbvalidators');
const router = Router();

// get all categories - public
router.get('/', paginateTotal);
// get a categories for id- public
router.get('/:id', [
    check('id', `this id doesn't valid`).isMongoId(),
    check('id').custom(categoryvalidator),
    campval
], getonly);
// create a new categories - private
router.post('/', [
    validatejwt,
    check('name', 'This name is requiered').not().isEmpty(),
    campval
], createCategory);
// update any info - if you hava a valid token
router.put('/:id', [
    validatejwt,
    check('name', 'Only can update the name in this category').not().isEmpty(),
    check('id', `this id doesn't valid`).isMongoId(),
    check('id').custom(categoryvalidator),
    campval
], categoryUpdate);
// delete any category - admin
router.delete('/:id', [
    validatejwt,
    isAdmin,
    // haveRole('ADMMIN_ROLE'),
    check('id', `this id doesn't valid`).isMongoId(),
    campval,
    check('id').custom(categoryvalidator),
    campval
], categoryDelete);

module.exports = router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjhkNjEzYTc
// wMzJiZjc0YjBlMGE3ZDQiLCJpYXQiOjE2NTM0MzI2NjMsImV4cCI6
// MTY1MzQ0NzA2M30.GR35TN0alI7UcEHtfHeh3O8fISbn40GHXAYR - jskgoo