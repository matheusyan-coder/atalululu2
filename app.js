const servidor = require('./config/servidor')
var app = servidor.app
var porta = servidor.porta

const index = require('./routes/index')(app)

const consign = require('consign')
consign().include('./routes').into(app)

app.listen(porta,()=>{console.log("http:/localhost:" + porta)})