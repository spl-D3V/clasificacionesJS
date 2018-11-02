const express = require("express");
const router = express.Router();
const csv = require('fast-csv');
const {Runner} = require("../models/Runner");
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
         let runner = new Runner({
             dorsal: parseInt(data[0]),
             apellidos: data[1],
             nombre: data[2],
             categoria: data[3],
             sexo: data[4]
         })
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
        res.send(totalentries + ' entradas subidas a base de datos.');
     });
});

module.exports = router;