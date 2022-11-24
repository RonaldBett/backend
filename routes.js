const express = require('express')
const routes = express.Router()

//RUTA PARA GET (SELECT)
routes.get('/', (req,res) => {
    //res.send('ahora si viene el sel')
    res.statusCode = 200;
    req.getConnection((err,conn) => {
        if(err) return res.send(err)

        conn.query('select * from books', (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        });
    })
})

//RUTA PARA POST (INSERT)
routes.post('/', (req,res) => {

    req.getConnection((err,conn) => {
        if(err) return res.send(err)

        conn.query('insert into books set ?', [req.body], (err, rows) => {
            if(err) return res.send(err)

            res.send('Agregado correctamente')
        });
    })
})

//RUTA PARA DELETE (INSERT)
routes.delete('/:id', (req,res) => {

    req.getConnection((err,conn) => {
        if(err) return res.send(err)

        conn.query('delete from books where book_id = ?', [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.send('Book deleted')
        });
    })
})

//RUTA PARA UPDATE (INSERT)
routes.put('/:id', (req,res) => {
        
    req.getConnection((err,conn) => {
        if(err) return res.send(err)

        conn.query('update books set ? where book_id = ?', [req.body, req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.send('Book updated')
        });
    })
})

module.exports = routes;