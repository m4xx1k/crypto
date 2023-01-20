const ApiError = require('../errors/api.error')
const filterService = require('../services/filter.service')

class filterController{
    async create(req, res, next){
        try{
            const {name, img, price, ath_price, ath_time, atl_price, atl_time, market_cap, total_supply,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10} = req.body
            if (name == undefined || img == undefined || ath_price == undefined || ath_time == undefined || atl_price == undefined || atl_time == undefined || market_cap == undefined || total_supply == undefined || price == undefined) {
                return next(ApiError.badRequest())
            }
            console.log({name, img, price, ath_price, ath_time, atl_price, atl_time, market_cap, total_supply,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10})
            const filter = await filterService.create({name, img, price, ath_price, ath_time, atl_price, atl_time, market_cap, total_supply,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10})

            return res.json(filter)
        }catch (e){
            next()
        }
    }

    async findAll(req, res, next){
        try {
            const filters = await filterService.findAll()

            return res.json(filters)
        }catch (e){
            next()//e
        }
    }

    async delete(req, res, next){
        try{
            const {name} = req.body
            if(name === undefined){
                return next(ApiError.badRequest())
            }
            const filter = await filterService.delete(name)

            return res.json(filter)
        }catch (e){
            next()//e
        }
    }


}

module.exports = new filterController()