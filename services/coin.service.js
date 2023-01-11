const Coin = require('../models/coin.model')
const ApiError = require(`../errors/api.error`)

class coinService{
    async create(name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10){
        const candidate = await Coin.findOne({name})
        if(candidate){
            throw ApiError.preconditionFailed()
        }
        const coin = await Coin.create({name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10})

        return coin
    }

    async findAll(){
        const coins = await Coin.find()

        return coins
    }

    async delete(name){
        const coin = await Coin.findOneAndDelete({name})

        return coin
    }

    async switchVisibility(name){
        const coin =  await Coin.findOne({name})
        const tf = coin.visible
        if(tf){coin.visible = false}else{coin.visible = true}
        coin.save()

        return coin
    }

    async redact(name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10){
        const coin = await Coin.findOne({name})
        if(coin == undefined){
            return await this.create(name, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10)
        }
        coin.name = name
        coin.c1 = c1
        coin.c2 = c2
        coin.c3 = c3
        coin.c4 = c4
        coin.c5 = c5
        coin.c6 = c6
        coin.c7 = c7
        coin.c8 = c8
        coin.c9 = c9
        coin.c10 = c10
        coin.save()

        return coin
    }

}

module.exports = new coinService()
