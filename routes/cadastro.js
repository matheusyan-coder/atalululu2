module.exports = (app)=>{
    app.get('/cadastro',(req,res)=>{
        res.render('cadastro.ejs')
    })

    app.post('/cadastro',async(req,res)=>{
        //recuperar as infomações deigitadas
        var dados = req.body

        //importar as configurações
        var database = require('../config/database')()

        //definir em qual coleção vamos gravar
        var usuarios = require('../models/usuario')

        var verificar = await usuarios.findOne({email:dados.email})
        if(verificar){
            return res.send("Email já cadastrado")
        }

        //gravar o documento
        var documentos = await new usuarios ({
            nome:dados.nome,
            email:dados.email,
            senha:dados.senha
        }).save()
        res.redirect('/login')
    })
}