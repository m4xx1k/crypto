const db= require('../db/db')

const schema = new db.Schema({
    name:{
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        default: true
    },
    c1: {
        type: String,
        required: true
    },
    c2: {
        type: String,
        required: true
    },
    c3: {
        type: String,
        required: true
    },
    c4: {
        type: String,
        required: true
    },
    c5: {
        type: String,
        required: true
    },
    c6: {
        type: String,
        required: true
    },
    c7: {
        type: String,
        required: true
    },
    c8: {
        type: String,
        required: true
    },
    c9: {
        type: String,
        required: true
    },
    c10: {
        type: String,
        required: true
    }

})

module.exports = db.model('Coin', schema)
