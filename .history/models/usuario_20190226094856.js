// Importaciones e inicializaciones.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var rolesValidos = {
    values: ['DIRECT_ROLE', 'ADMIN_ROLE', 'ALMA_ROLE', 'CONTA_ROLE', 'PROD_ROLE', 'SYSTEM_ROLE'],
    message: '{VALUES} el rol no es permitido'
}


var productoSchema = new Schema({
    nombre: { type: String, required: [true, 'el nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'el email es necesario'] },
    password: { type: String, required: [true, 'el password es necesario'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
});

productoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });


module.exports = mongoose.model('Usuario', productoSchema);