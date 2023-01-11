const ApiError = require('../errors/api.error')
const filterService = require('../services/filter.service')

class filterController{
    async create(req, res, next){
        try{
            const{name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10} = req.body
            if(name == undefined || c1 == undefined || c2 == undefined || c3 == undefined || c4 == undefined || c5 == undefined || c6 == undefined || c7 == undefined || c8 == undefined || c9 == undefined || c10 == undefined){
                return next(ApiError.badRequest())
            }
            const filter = await filterService.create(name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10)

            return res.json(filter)
        }catch (e){
            next(e)
        }
    }

    async findAll(req, res, next){
        try {
            const filters = await filterService.findAll()

            return res.json(filters)
        }catch (e){
            next(e)
        }
    }

    async delete(req, res, next){
        try{
            const {name} = req.body
            if(name == undefined){
                return next(ApiError.badRequest())
            }
            const filter = await filterService.delete(name)

            return res.json(filter)
        }catch (e){
            next(e)
        }
    }

    async switchFilter(req, res, next){
        try{
            const {name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10} = req.body
            if(name == undefined || c1 == undefined || c2 == undefined || c3 == undefined || c4 == undefined || c5 == undefined || c6 == undefined || c7 == undefined || c8 == undefined || c9 == undefined || c10 == undefined){
                    return next(ApiError.badRequest())
            }
            const filter = await filterService.switchFilter(name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10)

            return res.json(filter)
        }catch (e){
            next(e)
        }
    }

}

module.exports = new filterController()