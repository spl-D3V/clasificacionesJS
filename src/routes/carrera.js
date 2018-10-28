const express = require('express');
const router = express.Router();
const Runner = require('../models/Runner');

router.put('/:id', async(req, res) =>{
    await Runner.findByIdAndUpdate(req.params.id, req.body);
    res.json({status:'Runner updated'});
});

module.exports = router;