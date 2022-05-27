const {
    Router
} = require('express');
const {
    check,
} = require('express-validator');
const {
    login
} = require('../controllers/auth');
const {
    campval
} = require('../middlewares/validator')
const router = Router();

router.post('/login', [
    check('email', 'This field is required').isEmail(),
    check('pass', 'This field is required').not().isEmpty(),
    campval
], login);
module.exports = router;