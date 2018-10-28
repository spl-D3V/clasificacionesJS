const mongoose = require('mongoose');
const {Schema} = mongoose;
let RunnerSchema = new Schema({
    dorsal: {
        type: Number,
        unique: true,
        required: [true, 'campo obligatorio'],
        min:1,
        max:4
    },
    nombre: {
        type: String,
        trim: true,
        required: [true, 'campo obligatorio'],
        minlength: 3
    },
    apellidos: {
        type: String,
        trim: true,
        required: [true, 'campo obligatorio'],
        minlength: 3
    },
    categoria: {
        type: String,
        required: [true, 'campo obligatorio']
    },
    sexo: {
        type: Boolean,
        default: true
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