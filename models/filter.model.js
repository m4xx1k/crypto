const db= require('../db/db')

const schema = new db.Schema({
    name:{
        type: String,
        required: true
    },
    img: {
        type: Boolean,
        default: true
    },
    price: {
        type: Boolean,
        default: true
    },
    ath_price: {
        type: Boolean,
        default: true
    },
    ath_time: {
        type: Boolean,
        default: true
    },
    atl_price: {
        type: Boolean,
        default: true
    },
    atl_time: {
        type: Boolean,
        default: true
    },
    market_cap: {
        type: Boolean,
        default: true
    },
    total_supply: {
        type: Boolean,
        default: true
    }

})

module.exports = db.model('Filter', schema)
