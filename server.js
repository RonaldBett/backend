const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const routes = require('./routes.js')

const app = express()

app.set('port',9000)

const dbOptions = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'admin4490',
    database: 'library'
}

/// middlewares
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json()) /// formato de entrega y de recepción

//routes
app.get('/', (req,res) => {
    res.send('Welcome to my app')
})

app.use('/api', routes)

app.listen(app.get('port'),() =>{
    console.log(`server running to port ${app.get('port')}`)
});