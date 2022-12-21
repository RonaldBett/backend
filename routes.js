const express = require('express');
const routes = express.Router()

//RUTA PARA GET (SELECT)
routes.get('/:table', (req, res) => {
    res.statusCode = 200;
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        var query = `select * from ${req.params.table}`
        conn.query(query, (err, rows) => {
            if (err) return res.send(err)

            // Si el parametro table == marcadores hace una llamado a deportes y equipos
            // y agrega esta informacion a la tabla marcadores
            // para que en las tablas deportes y equipos se vea el objeto completo y no solo el id 
            if (req.params.table == 'marcadores') {

                var queryDeportes = 'select * from deportes'
                conn.query(queryDeportes, (error, rowsDep) => {
                    if (error) return res.send(error)

                    rows.map(evento => {
                        evento.dep_id = rowsDep.filter(deporte => deporte.dep_id == evento.dep_id)[0]
                    })
                })

                var queryEquipos = 'select * from equipos'
                conn.query(queryEquipos, (error, rowsEqui) => {
                    if (error) return res.send(error)

                    rows.map(evento => {
                        evento.equi_id1 = rowsEqui.filter(equipos => equipos.equi_id == evento.equi_id1)[0]
                        evento.equi_id2 = rowsEqui.filter(equipos => equipos.equi_id == evento.equi_id2)[0]
                    })
                    res.send(rows)
                })

            } else {
                res.send(rows)
            }
        });
    })
})

///route for insert
routes.post('/:table',(req,res)=>{
    //res.send('Ahora si viene el sel')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        var ssql='INSERT INTO '+req.params.table+' set ? '
        conn.query(ssql,[req.body],(err,rows)=>{
            if(err) return res.send(err)
            res.send('Add ok!')
        })

    })
})

//// route for delete
routes.delete('/:table/:field/:id',(req,res)=>{
    
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        var ssql='DELETE FROM '+req.params.table+' WHERE '+req.params.field+' = '+req.params.id

        conn.query(ssql,(err,rows)=>{
            if(err) return res.send(err)
            res.send('Book deleted ok!')
        })

    })
})

//// route update
routes.put('/:table/:field/:id',(req,res)=>{
    
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        var ssql='UPDATE '+req.params.table+ ' set ? WHERE '+req.params.field+' = '+req.params.id

        conn.query(ssql,[req.body],(err,rows)=>{
            if(err) return res.send(err)
            res.send('Book UPDATED ok!')
        })

    })
})

// ruta para inicio de sesión

routes.get('/:table/:email/:clave',(req,res)=>{
    //res.send('Aqui si es el select')

    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        var ssql="select * from "+req.params.table+" where usu_email='"+req.params.email+"' and usu_clave='"+req.params.clave+"'"

        conn.query(ssql,(err,rows)=>{
            if(err) return res.send(err)
            res.json(rows)

        })

    })
                        
})

// ruta para listar registro con limite

///  route for select  ------------------------------------------

// ruta para listar registro con limite

///  route for select  ------------------------------------------

routes.get('/:table/:lim',(req,res)=>{
    //res.send('Ahora si viene el sel')
    req.getConnection((err,conn)=>{
     
     if(err) return res.send(err)
     var ssql='select mar_fechaevento '
     ssql+=",mar_horaevento as hora "
     ssql+=",t2.equi_nombre as nombre1 "
     ssql+=",t1.mar_marcadorequi1 as marcador1 "
     ssql+=",t3.equi_nombre as nombre2 "
     ssql+=",t1.mar_marcadorequi2 as marcador2 "
     ssql+=",dep_nombre as deportes "
     ssql+=" from marcadores t1 "
     ssql+=" LEFT JOIN equipos t2 ON t1.equi_id1 = t2.equi_id "
     ssql+=" LEFT JOIN equipos t3 ON t1.equi_id2 = t3.equi_id "
     ssql+=" LEFT JOIN deportes ON t1.dep_id=deportes.dep_id "   
     ssql+=" ORDER BY 1 desc LIMIT "+req.params.lim  
     conn.query(ssql,(err,rows)=>{
         if(err) return res.send(err)
 
         res.json(rows)
     })
 
    })
 })

// ruta para listar registro con limite

// ruta para listar registro con limite




module.exports=routes