const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {Runner} = require('../models/Runner');
const {category} = require('../helpers/helpers');

router.get('/', async(req, res) =>{
    let listrunner = await Runner.find({}, 'nombre apellidos dorsal', {sort:'apellidos'});
    res.render("inscritos", {listaCorredores: listrunner});
});
router.get('/runner/:id', async(req, res) =>{
    const runner = await Runner.findOne({dorsal:req.params.id});
    if (runner){
        res.render("corredor", {runner});
    }else{
        res.redirect("/inscripcion");
    }
});
router.get('/runner', async(req, res) =>{
    res.render("corredornuevo");
});
router.post('/runner', async(req, res)=>{
    let body = _.pick(req.body, ['nombre', 'apellidos', 'camiseta', 
    'talla', 'pago', 'comentario', 'fnacimiento', 'dorsal', 'sexo']);
    const runner = new Runner(body);
    await runner.save();
    res.redirect('/inscripcion/runner/'+runner.dorsal);
});
router.put('/runner/:id', async(req, res) =>{
    let body = _.pick(req.body, ['nombre', 'apellidos', 'camiseta', 
    'talla', 'pago', 'comentario', 'fnacimiento', 'dorsal', 'sexo']);
    if(!body.hasOwnProperty('camiseta')){
        body.camiseta = false;
    }
    body.categoria = category(body.fnacimiento);
    let runner = await Runner.findOneAndUpdate({dorsal:req.params.id}, body, {new: true});
    res.render("corredor", {runner});
});
router.delete('/runner/:id', async(req, res) =>{
    let dorsalid = parseInt(req.params.id);
    if(dorsalid){
        await Runner.deleteOne({dorsal:dorsalid});
        res.statusCode = 301;
        res.render("corredornuevo");
    }
    res.statusCode = 404;
    res.send();
});

module.exports = router;