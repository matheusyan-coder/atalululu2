const alimentos = require('../models/alimentos')
const usuario = require('../models/usuario')

module.exports = (app) => {
    app.post('/alimentos', async (req, res) => {
        var dados = req.body

        //conectar com o database
        const database = require('../config/database')()

        // importar o model atividades
        const alimentos = require('../models/alimentos')
        
        //gravar as informações do forms no database
        var gravar = await new alimentos({
            produto: dados.produto,
            validade: dados.validade,
            usuario: req.query.id
        }).save()

        //recarregar a página alimentos
        res.redirect('/alimentos?id=' + req.query.id)
    })

    app.get('/alimentos', async(req, res) => {
        var user = req.query.id
        var ordem = req.query.ordem
        if(!user){
            res.redirect('/login')
        }
        var usuarios = require('../models/usuario')
        var alimentos = require('../models/alimentos')

        var dadosUser = await usuarios.findOne({_id:user})

        if(!ordem || ordem == 0){

            var produtosGeral = await alimentos.find({usuario:dadosUser._id, status:"0"}).sort({validade:1})

            var produtosDescarte = await alimentos.find({usuario:dadosUser._id, status:"1"}).sort({validade:1})
    
        }else{
            var produtosGeral = await alimentos.find({usuario:dadosUser._id, status:"0"}).sort({produto:1})

            var produtosDescarte = await alimentos.find({usuario:dadosUser._id, status:"1"}).sort({produto:1})
    
        }


        res.render('alimentos.ejs', ({nome:dadosUser.nome, id:dadosUser._id,produtosDescarte,produtosGeral}))
        //res.render('alimentos.ejs', ({nome:dadosUser.nome, id:dadosUser._id, lista:dadosalimentos}))
    })
    
    app.get('/descartado', async(req,res)=>{
        //qual documento será excluído da collection alimentos?
        var doc = req.query.id
        //entregar o documento 
        var entregue = await alimentos.findOneAndUpdate({_id:doc},{status:"1"})
        //voltar para a lista de alimentos
         res.redirect('/alimentos?id='+ entregue.usuario)
    })
 
    app.get('/excluir', async(req,res)=>{
        //qual documento será excluído da collection alimentos?
        var doc = req.query.id
        //exclui o documento 
        var entregue = await alimentos.findByIdAndRemove({_id:doc})
        //voltar para a lista de alimentos
         res.redirect('/alimentos?id='+ entregue.usuario)
    })
}