const mysql = require('mysql');

//Conexion con mysql. 
//Primero definimos la ubicacion de la base de datos
const dbOptions = {
    host:"localhost",
    port : 3306,
    user: 'root',
    password: 'admin4490',
    database: 'deportes'
}

module.exports = {
    mysql: mysql,
    dbOptions: dbOptions
  };