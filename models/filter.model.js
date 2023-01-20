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
    },
    c1: {
        type: Boolean,
        required: true
    },
    c2: {
        type: Boolean,
        required: true
    },
    c3: {
        type: Boolean,
        required: true
    },
    c4: {
        type: Boolean,
        required: true
    },
    c5: {
        type: Boolean,
        required: true
    },
    c6: {
        type: Boolean,
        required: true
    },
    c7: {
        type: Boolean,
        required: true
    },
    c8: {
        type: Boolean,
        required: true
    },
    c9: {
        type: Boolean,
        required: true
    },
    c10: {
        type: Boolean,
        required: true
    }

})

module.exports = db.model('Filter', schema)
