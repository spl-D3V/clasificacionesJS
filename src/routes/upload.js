const express = require("express");
const csv = require('fast-csv');
const router = express.Router();
const {Runner} = require("../models/Runner");
const {category} = require('../helpers/helpers')
const nentries = 500;

router.get('/', function (req, res) {
    res.render("upload");
});
router.post('/', function (req, res) {
    if (!req.files){
        return res.status(400).send('Ningun archivo subido');
    }
    let runnersFile = req.files.file;
    let runners = [];
    let totalentries = 0;
    csv
     .fromString(runnersFile.data.toString(), {
         headers: false,
         ignoreEmpty: false
     })
     .on("data", function(data){
         let anio = parseInt(data[3]);
         let runner = new Runner({
             dorsal: parseInt(data[0]),
             apellidos: data[1],
             nombre: data[2],
             fnacimiento: isNaN(anio) ? 2019 : anio,
             sexo: data[4] === 'MUJER' ? 1 : 0,
             categoria: category(anio),
             pago: data[6],
             talla: data[7],
             camiseta: (!data[7] || 0 === data[7].length) ? false : true
         });
         console.log(runner);
         runners.push(runner);
         if (runners.length === nentries){
            Runner.collection.insertMany(runners, function(err, documents) {
                if (err){
                    throw err;
                }
            });
            totalentries += nentries;
            runners = [];
         }
     })
     .on("end", function(){
        Runner.collection.insertMany(runners, function(err, documents) {
            if (err){
                throw err;
            }
        });
        totalentries += runners.length
        req.flash("info", totalentries + ' entradas subidas a base de datos correctamente');
        res.redirect("/upload");
     });
});

module.exports = router;