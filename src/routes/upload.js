const express = require("express");
const csv = require('fast-csv');
const router = express.Router();
const {Runner} = require("../models/Runner");
const {category, SexoToId} = require('../helpers/helpers')
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
         let anio = data[3];
         let cam = data[6].trim().replace("--","");
         let runner = new Runner({
             dorsal: parseInt(data[0]),
             apellidos: data[1].trim() || "Desconocido",
             nombre: data[2].trim() || "Desconocido",
             fnacimiento: isNaN(anio) ? 2019 : anio,
             sexo: SexoToId(data[4].trim()),
             categoria: category(anio),
             pago: data[5] || 3,
             talla: cam,
             camiseta: (!cam || 0 === cam) ? false : true
         });
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