const {
    Router
} = require('express');
const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch,
    users404
} = require('../controllers/users');

const router = Router();

router.get('/', usersGet)
router.get('/*', users404)
router.put('/:id', usersPut)
router.put('*', users404)
router.post('/', usersPost)
router.post('*', users404)
router.delete('/', usersDelete)
router.delete('*', users404)
router.patch('/', usersPatch)
router.patch('*', users404)

module.exports = router;