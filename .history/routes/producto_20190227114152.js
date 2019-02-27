var express = require('express');



var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Producto = require('../models/producto');

// ==========================================
// Obtener todos los productos
// ==========================================
app.get('/', (req, res, next) => {

    Producto.find({}, 'codigo nombre presentacion nivel cantidad caducidad descripcion ')
        .populate('usuario', 'nombre')
        .exec(
            (err, productos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando producto',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    productos: productos
                });



            });
});


// ==========================================
// Actualizar producto
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Producto.findById(id, (err, producto) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar producto',
                errors: err
            });
        }

        if (!producto) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El producto con el id ' + id + ' no existe',
                errors: { message: 'No existe un producto con ese ID' }
            });
        }


        Producto.codigo = body.codigo;
        Producto.nombre = body.nombre;
        Producto.presentacion = body.presentacion;
        Producto.cantidad = body.cantidad;
        Producto.lote = body.lote;
        Producto.caducidad = body.caducidad;
        Producto.precio = body.precio;
        Producto.descripcion = body.descripcion;
        Producto.proveedor = body.proveedor;

        producto.save((err, productoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar producto',
                    errors: err
                });
            }



            res.status(200).json({
                ok: true,
                producto: productoGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo producto
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var producto = new Producto({

        codigo: body.codigo,
        nombre: body.nombre,
        presentacion: body.presentacion,
        cantidad: body.cantidad,
        lote: body.lote,
        caducidad: body.caducidad,
        precio: body.precio,
        descripcion: body.descripcion,
        proveedor: body.proveedor,
        usuario: req.usuario._id
    });

    producto.save((err, productoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear producto',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoGuardado,
            productotoken: req.producto
        });


    });

});


// ============================================
//   Borrar un producto por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Producto.findByIdAndRemove(id, (err, productoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar producto',
                errors: err
            });
        }

        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un producto con ese id',
                errors: { message: 'No existe un producto con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            producto: productoBorrado
        });

    });

});


module.exports = app;