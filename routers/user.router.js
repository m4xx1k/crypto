const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/authMidlleware');

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/all', userController.findAll)
router.delete('/delete', authMiddleware,userController.delete)
router.get('/refresh', authMiddleware, userController.refresh)

module.exports = router