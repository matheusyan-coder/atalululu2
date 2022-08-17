const mongoose = require('mongoose')

const conexao = async () => {
    var atlas = await mongoose.connect('mongodb+srv://userAdmin:matheus2006@fiaptecnico.p5s1m.mongodb.net/test')
}


module.exports = conexao