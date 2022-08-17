module.exports = (app)=>{
    app.get('/login',(req,res)=>{
        res.render('login.ejs')
    })


    app.post('/login', async (req, res) => {
        //recuperar as infomações digitadas no formulario
        var dados = req.body

        //conectar com o banco de dados
        var database = require('../config/database')()

        //selecionar a model usuarios
        var usuarios = require('../models/usuario')

        //verificar se o email esta cadastrado
        var verificarEmail = await usuarios.findOne({ email: dados.email })

        if (!verificarEmail) {
            return res.send("email não cadastrado")
        }else{
            var verificarSenha = await usuarios.findOne({email:dados.email, senha: dados.senha })
    
            if (!verificarSenha) {
                return res.send("senha errda parca")
            }

        }


        //redirecionar para a tora atividads(precisa enviar o id)
        res.redirect('/alimentos?id='+verificarSenha._id)
    })
}