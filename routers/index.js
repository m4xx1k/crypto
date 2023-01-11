const Router = require('express')
const router = new Router()
const userRouter = require('./user.router')
const coinRouter = require('./coin.router')
const filterRouter = require('./filter.router')

router.use('/user', userRouter)
router.use('/coin', coinRouter)
router.use('/filter', filterRouter)

module.exports = router