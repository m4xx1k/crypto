const ApiError = require('../errors/api.error')
const coinService = require('../services/coin.service')

class coinController{
    async create(req, res, next){
        try{
            const{name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10} = req.body
            if(name == undefined || c1 == undefined || c2 == undefined || c3 == undefined || c4 == undefined || c5 == undefined || c6 == undefined || c7 == undefined || c8 == undefined || c9 == undefined || c10 == undefined){
                return next(ApiError.badRequest())
            }
            const coin = await coinService.create(name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10)

            return res.json(coin)
        }catch (e){
            next()//e
        }
    }

    async findAll(req, res, next){
        try {
            const coins = await coinService.findAll()

            return res.json(coins)
        }catch (e){
            next()//e
        }
    }

    async delete(req, res, next){
        try{
            const {name} = req.body
            if(!name){
                return next(ApiError.badRequest())
            }
            const coin = await coinService.delete(name)

            return res.json(coin)
        }catch (e){
            next()//e
        }
    }

    async switchVisibility(req, res, next){
        try{
            const {name} = req.body
            if(name == undefined){
                return next(ApiError.badRequest())
            }
            const coin = await coinService.switchVisibility(name)

            return res.json(coin)
        }catch (e){

        }
    }

    async redact(req, res, next){
        try{
            const{name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10} = req.body

            if(name == undefined || c1 == undefined || c2 == undefined || c3 == undefined || c4 == undefined || c5 == undefined || c6 == undefined || c7 == undefined || c8 == undefined || c9 == undefined || c10 == undefined){
                return next(ApiError.badRequest())
            }
            const coin = await coinService.redact(name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10)

            return res.json(coin)
        }catch (e) {
            next()//e
        }
    }

}

module.exports = new coinController()