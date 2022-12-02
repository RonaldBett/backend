const express = require('express');
const routes = require('./routes.js');
const myconn = require('express-myconnection');
const {mysql, dbOptions} = require('./connsql.js');
const cors = require('cors');

//Creamos la app-servidor con express
const app = express();

//Se define el puerto en las variables de la app
app.set('port',9000);

//Establecemos la conexion de mysql con la app
app.use(myconn(mysql, dbOptions, 'single'))

//app.use => Nos premite definir el formato de entrada y salida de datos
app.use(express.json())

//Con el metodo listen encendemos el servidor, como primer argumento colocamos el puerto 
app.listen(app.get('port'), () => {
    console.log('Listening on port', app.get('port'))
});

//Metodo get (rest) 
app.get('/',(req, res) =>{
    res.send("ruta raiz")
})

//Aqui establecemos las diferentes rutas utilizando un router, para mejorar el orden del codigo
app.use('/api',routes);


