const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Runner = require('../models/Runner');

router.get('/:id', async(req, res) =>{
    const runner = await Runner.findById(req.params.id);
    res.json(runner);
});

router.post('/', async(req, res)=>{
    let body = _.pick(req.body, ['text', 'completed']);
    const Runner = new Runner(body);
    await Runner.save();
    res.json({status: 'Runner saved'});
});

router.put('/:id', async(req, res) =>{
    let body = _.pick(req.body, ['text', 'completed']);
    await Runner.findByIdAndUpdate(req.params.id, body);
    res.json({status:'Runner updated'});
});

module.exports = router;