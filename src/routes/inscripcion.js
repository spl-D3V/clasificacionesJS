const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {Runner} = require('../models/Runner');

router.get('/', async(req, res) =>{
    let listrunner = await Runner.find({}, 'nombre apellidos dorsal', {sort:'apellidos'});
    res.render("inscritos", {listaCorredores: listrunner});
});
router.get('/runner/:id', async(req, res) =>{
    const runner = await Runner.findOne({dorsal:req.params.id});
    res.render("corredor", {runner});
});
router.get('/runner', async(req, res) =>{
    res.render("corredornuevo");
});
router.post('/runner', async(req, res)=>{
    let body = _.pick(req.body, ['nombre', 'apellidos', 'dorsal', 'sexo', 'categoria']);
    console.log(body);
    console.log(req.body);
    //const runner = new Runner(body);
    //await runner.save();
    res.json({status: 'Runner saved'});
});
router.put('runner/:id', async(req, res) =>{
    let body = _.pick(req.body, ['text', 'completed']);
    await Runner.findByIdAndUpdate(req.params.id, body);
    res.json({status:'Runner updated'});
});
router.delete('runner/:id', async(req, res) =>{
    let body = _.pick(req.body, ['text', 'completed']);
    await Runner.deleteOne(req.params.id, body);
    res.json({status:'Runner updated'});
});

module.exports = router;