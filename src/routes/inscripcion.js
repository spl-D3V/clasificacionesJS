const express = require('express');
const router = express.Router();
const Runner = require('../models/Runner');

router.get('/:id', async(req, res) =>{
    const runner = await Runner.findById(req.params.id);
    res.json(runner);
});

router.post('/', async(req, res)=>{
    const Runner = new Runner(req.body);
    await Runner.save();
    res.json({status: 'Runner saved'});
});

router.put('/:id', async(req, res) =>{
    await Runner.findByIdAndUpdate(req.params.id, req.body);
    res.json({status:'Runner updated'});
});

module.exports = router;