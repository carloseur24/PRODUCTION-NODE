const {
    Router
} = require('express');
const {
    check,
} = require('express-validator');
const {
    rolvalidator,
    emailvalidator,
    uservalidator
} = require('../helpers/dbvalidators')

const {
    campval,
    validatejwt,
    isAdmin,
    haveRole
} = require('../middlewares')


const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
} = require('../controllers/users');
const router = Router();


router.get('/', usersGet)
router.put('/:id', [
    check('id', `this isn't a valid ID`).isMongoId(),
    check('id').custom(uservalidator),
    check('rol').custom(rolvalidator),
    campval
], usersPut)

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('pass', 'The pass is required and it must has 6 or more words').isLength({
        min: 6
    }),
    check('email', 'This value isnt a email').isEmail(),
    check('email').custom(emailvalidator),
    check("rol").custom(rolvalidator),
    campval
], usersPost)

router.delete('/:id', [
    validatejwt,
    // isAdmin,
    haveRole('ADMMIN_ROLE', 'SELL_ROLE'),
    check('id', `this isn't a valid ID`).isMongoId(),
    check('id').custom(uservalidator),
    campval
], usersDelete)

router.patch('/', usersPatch)

module.exports = router;