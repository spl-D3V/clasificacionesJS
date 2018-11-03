const mongoose = require('mongoose');
const {Schema} = mongoose;
let RunnerSchema = new Schema({
    dorsal: {
        type: Number,
        unique: true
    },
    nombre: {
        type: String,
        trim: true,
        minlength: 3
    },
    apellidos: {
        type: String,
        trim: true,
        minlength: 3
    },
    categoria: {
        type: Number,
        default: 8
    },
    sexo: {
        type: Number,
        default: 0
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