const express = require('express');
const router = express.Router();
const {Runner} = require('../models/Runner');
module.exports = function(app, io){

}
router.put('/:id', async(req, res) =>{
    const body = {meta: true, llegada: Date.now()};
    const dorsalId = {dorsal: parseInt(req.params.id)}
    let runner = await Runner.findOneAndUpdate(dorsalId, body, {new: true});
    if(runner){
        console.log(runner);
    }
});

router.get('/', async(req, res) =>{
    let messages = await Runner.find({meta:true}, null, {sort:'llegada'});
    res.render("clasificacion");
});

module.exports = router;