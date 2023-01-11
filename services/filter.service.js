const Filter = require('../models/filter.model')
const ApiError = require(`../errors/api.error`)

class filterService{
    async create(name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10){
        const candidate = await Filter.findOne({name})
        if(candidate){
            throw ApiError.preconditionFailed()
        }
        const filter = await Filter.create({name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10})

        return filter
    }

    async findAll(){
        const filters = await Filter.find()

        return filters
    }

    async delete(name){
        const filter = await Filter.findOneAndDelete({name})

        return filter
    }

    async switchFilter(name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10) {
        const filter = await Filter.findOne({name})
        if(filter == undefined){
            throw ApiError.notFound()
        }
        filter.c1 = c1
        filter.c2 = c2
        filter.c3 = c3
        filter.c4 = c4
        filter.c5 = c5
        filter.c6 = c6
        filter.c7 = c7
        filter.c8 = c8
        filter.c9 = c9
        filter.c10 = c10
        filter.save()

        return filter
    }

}

module.exports = new filterService()
