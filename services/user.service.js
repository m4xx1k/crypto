const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const ApiError = require(`../errors/api.error`)
const tokenService = require('../services/token.service')
const UserDto = require('../dtos/user.dto')

class userService{
    async findAll() {
        return await User.find()
    }
    async delete(login) {
        return await User.findOneAndDelete({login})
    }

    async registration(login, password){
        const candidate = await User.findOne({login})
        if(candidate){
            throw ApiError.preconditionFailed('Корситувач з таким login вже зареєстрований!')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const time = new Date().toISOString()
        const user = await User.create({login, password: hashPassword, time})

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return ({...tokens, user: userDto})
    }

    async login(login, password){
        const user = await User.findOne({login})
        if(user == undefined){
            throw ApiError.notFound('Користувача з таким login не знайдено!')
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            throw ApiError.badRequest('Невірний пароль!')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return ({...tokens, user: userDto})
    }

    async refresh(refreshToken){
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(tokenFromDb == undefined || userData == undefined){
            throw ApiError.unauthorized("Користувач не авторизований!")
        }
        const id = userData.id
        const user = await User.findOne({id})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return ({accessToken: tokens.accessToken, user: userDto})
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async firstUser(){
        const user = await User.find()
        if(user.length){
            return null
        }
        const firstUser = this.registration(process.env.ADMIN_LOGIN, process.env.ADMIN_PASSWORD)
        return null
    }

}
module.exports = new userService()
