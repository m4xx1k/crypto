const Coin = require('../models/coin.model')
const ApiError = require(`../errors/api.error`)

class coinService{
    async create(data){
        const candidate = await Coin.findOne({name:data.name})
        if(candidate){
            throw ApiError.preconditionFailed()
        }
        return await Coin.create(data)
    }

    async findAll(){
        return await Coin.find()
    }

    async delete(name){
        return await Coin.findOneAndDelete({name})
    }


    async redact(data){
        const coin = await Coin.findOne({name:data.name})
        if(coin == undefined){
            return await this.create(data)
        }else{
            console.log(data)
            return await coin.updateOne({name: data.name}, data);
        }
    }

}

module.exports = new coinService()
