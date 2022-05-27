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

router.get('/google',  (res, req)=>{
    
});
module.exports = router;