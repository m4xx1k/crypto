const ApiError = require(`../errors/api.error`)
const userService = require('../services/user.service')

class userController{
    async registration(req, res, next){
        try{
            const {login, password} = req.body
            if(!password || !login){
                return next(ApiError.badRequest("Не введено логін або пароль!"))
            }
            const userData = await userService.registration(login, password)
            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        }catch (e) {
            next()//e
        }
    }
    async login(req, res, next){
        try {
            const {login, password} = req.body
            if(login == undefined || password == undefined){
                return next(ApiError.badRequest('Не введено логін або пароль!'))
            }
            const userData = await userService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json({accessToken: userData.accessToken, user: userData.user})
        }catch (e){
            next()//e
        }
    }
    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies
            if(refreshToken == undefined){
                return next(ApiError.badRequest('Користувач не авторизований!'))
            }
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json({accessToken: userData.accessToken, user: userData.user})
        }catch (e) {
            next()//e
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies
            const token = userService.logout(refreshToken)
            res.clearCookie('refreshToken')

            return res.json(token)
        }catch (e) {
            next()//e
        }
    }

}

module.exports = new userController()