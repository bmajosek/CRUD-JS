const mongoose = require('mongoose')

const Jedzenieschema = mongoose.Schema({
    nazwa:{
        type: String
    },
    ile:{
        type: Number
    }
})

const Jedz = mongoose.model("Jedz",Jedzenieschema)
module.exports = Jedz