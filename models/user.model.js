const db= require('../db/db')

const schema = new db.Schema({
    login:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = db.model('User', schema)