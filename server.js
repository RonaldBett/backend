const express = require('express');
const routes = require('./routes.js');
const myconn = require('express-myconnection');
const {mysql, dbOptions} = require('./connsql.js');
const cors = require('cors');

//Creamos la app-servidor con express
const app = express();

//Es una buena practica definir el puerto en las variables de la app
app.set('port',9000);

//Establecemos la conexion de mysql con la app
app.use(myconn(mysql, dbOptions, 'single'))

//app.use => Nos premite definir el formato de entrada y salida de datos, sin el metodo 'use' no funciona el 
//post,put... correctamente 
app.use(express.json())

//Con el metodo listen encendemos el servidor, como primer argumento colocamos el puerto que 
//queramos utilizar y en el segundo argumento podemos poner una funcion que se va a ejecutar 
//cada vez que iniciemos el servidor
app.listen(app.get('port'), () => {
    console.log('Listening on port', app.get('port'))
});

//Metodo get (rest) sirve para enviar datos al cliente. El primer argumento es la ruta-endpoint a usar
// y el 2do argumento es una funcion flecha con el request (datos que llegan desde el cliente) y el
//response (datos que se envian al servidor como respuesta)
app.get('/',(req, res) =>{
    res.send("ruta raiz")
})

//Aqui establecemos las diferentes rutas utilizando un router, para mejorar el orden del codigo
app.use('/api',routes);


