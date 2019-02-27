// Importaciones e inicializaciones.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var presentacionValida = {
    values: ['costal', 'Kg', 'Lt'],
    message: '{VALUES} la presentacion no es permitida'
}
var nivelValido = {
    values: ['materia-prima', 'terminado', 'semi-terminado', 'material-empaque', 'material-transito'],
    message: '{VALUES} la presentacion no es permitida'
}


var productoSchema = new Schema({
    codigo: { type: String, unique: true, required: [true, 'el codigo del producto es necesario'] },
    nombre: { type: String, required: [true, 'el nombre del producto es necesario'] },
    presentacion: { type: String, required: true, default: 'costal', enum: presentacionValida },
    nivel: { type: String, required: true, default: 'materia-prima', enum: nivelValido },
    cantidad: { type: Number, required: true },
    lote: { type: String, required: false },
    caducidad: { type: Date, required: true },
    precio: { type: Number, required: false },
    img: { type: String, required: false },
    descripcion: { type: String, required: false },

});

productoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });


module.exports = mongoose.model('Producto', productoSchema);