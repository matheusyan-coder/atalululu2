const mongoose = require('mongoose')

const modelo = mongoose.Schema({
    produto: String,
    validade: Date,
    usuario : String,
    status: {type: String, default: "0"} //boolean
})

const atividades = mongoose.model('alimentos', modelo)

module.exports = atividades