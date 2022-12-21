const express=require('express')
const mysql=require('mysql')
const myconn =require('express-myconnection')
const routes=require('./routes')
const cors=require('cors')
const {PORT_SERVER, HOST, PORT_DB, USER_DB, PWD_DB, NAME_DB} = require('./config.js')

const app=express()
app.use(cors())
app.set('port',PORT_SERVER);

const dbOptions={
    host:HOST,
    port:PORT_DB,
    user:USER_DB,
    password:PWD_DB,
    database:NAME_DB
}
//middelwares
app.use(myconn(mysql,dbOptions,'single'))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Welcome to my APP');

})
app.use('/api', routes)

app.listen(app.get('port'),()=>{
    console.log(`server running on port ${app.get('port')}`)
})

