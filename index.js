const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

// Vai encadear para "carregar as dependências e injetar no nosso app"
consign()
.then('./config/middlewares.js')
.then('./api')
.then('./config/routes.js')
.into(app)


app.listen(3000, () => {
    console.log("Backend funcionando!")
})