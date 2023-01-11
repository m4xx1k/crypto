const Router = require('express')
const router = new Router()
const filterController = require('../controllers/filter.controller')
const authMiddleware = require('../middlewares/authMidlleware');

router.post('/create', authMiddleware, filterController.create)
router.get('/filters', authMiddleware, filterController.findAll)
router.delete('/delete', authMiddleware, filterController.delete)
router.put('/switchFilter', authMiddleware, filterController.switchFilter)

module.exports = router