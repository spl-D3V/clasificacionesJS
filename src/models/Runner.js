const mongoose = require('mongoose');
const {Schema} = mongoose;
let RunnerSchema = new Schema({
    dorsal: {
        type: Number,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        trim: true,
        minlength: 3,
        required: true
    },
    apellidos: {
        type: String,
        trim: true,
        minlength: 3,
        required: true
    },
    camiseta:{
        type: Boolean,
        default: false
    },
    talla:{
        type: String,
        default: ""
    },
    pago:{
        type: Number,
        default: null
    },
    comentario:{
        type: String,
        default: ""
    },
    fnacimiento:{
        type: Number,
        default: null
    },
    categoria: {
        type: Number,
        default: 0,
        required: true
    },
    sexo: {
        type: Number,
        default: 0,
        required: true
    },
    meta: {
        type: Boolean,
        default: false
    },
    llegada:{
        type: Number,
        default: null
    }
});

let Runner = mongoose.model('Runners', RunnerSchema);
module.exports = {Runner};