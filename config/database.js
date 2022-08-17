const mongoose = require('mongoose')

const conexao = async () => {
    var atlas = await mongoose.connect('mongodb+srv://admin:admin123456@fiap-tecnico.dsp0j.mongodb.net/at2')
}


module.exports = conexao