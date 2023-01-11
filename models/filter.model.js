const db= require('../db/db')

const schema = new db.Schema({
    name:{
        type: String,
        required: true
    },
    c1: {
        type: Boolean,
        default: true
    },
    c2: {
        type: Boolean,
        default: true
    },
    c3: {
        type: Boolean,
        default: true
    },
    c4: {
        type: Boolean,
        default: true
    },
    c5: {
        type: Boolean,
        default: true
    },
    c6: {
        type: Boolean,
        default: true
    },
    c7: {
        type: Boolean,
        default: true
    },
    c8: {
        type: Boolean,
        default: true
    },
    c9: {
        type: Boolean,
        default: true
    },
    c10: {
        type: Boolean,
        default: true
    }

})

module.exports = db.model('Filter', schema)
