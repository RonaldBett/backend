const express = require('express');

const routes = express.Router();

//Definimos las api rest (las rutas que vamos a enviar a la app)
routes.get('/:tabla', (req, res) => {
  //Establecemos conexion con base de datos
  req.getConnection((error, conexion) => {
    if(error) return res.send(error);
    var query = `SELECT * FROM ${req.params.tabla}`

    //Si no hay error de conexion, hacemos un query a la base de datos
    conexion.query(query, (error, datos) => {
      if(error) return res.send(error)
      //Si no hay errores en el query, enviamos los datos al cliente
      res.send(datos)
    });

  })
});

routes.post('/:tabla', (req,res) => {

  req.getConnection((error,conexion) =>{
    if(error) return res.send(error)
    var query = `INSERT INTO ${req.params.tabla} set ?`

    conexion.query(query, [req.body], (error, datos) => {
      if(error) return res.send(error)
      res.send(req.body)
    });

  });
});

routes.put('/:tabla/:idname/:id', (req, res) => {

  req.getConnection((error, conexion) => {
    if(error) return res.send(error)
    var query = `UPDATE ${req.params.tabla} set ? WHERE ${req.params.idname} = ${req.params.id}`
  
    conexion.query(query, [req.body], (error, datos) => {
      if(error) return res.send(error)
      res.send(req.body)
    });
  });
});

routes.delete('/:tabla/:idname/:id', (req, res) => {

  req.getConnection((error, conexion) => {
    if(error) return res.send(error)
    var query = `DELETE FROM ${req.params.tabla} WHERE ${req.params.idname} = ${req.params.id}`

    conexion.query(query, (error, datos) => {
      if(error) return res.send(error)
      res.send('Successfully deleted')
    });
  });
});

module.exports = routes;