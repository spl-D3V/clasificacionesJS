const express = require('express');
const router = express.Router();
const {Runner} = require('../models/Runner');
const {transCategoria, transSexo} = require('../helpers/helpers');

router.get('/total', async(req, res) =>{
    const nrunners = await Runner.count();
    res.json({total:nrunners});
});
router.get('/totalcategorias', async(req, res) =>{
    
    const total = await Runner.aggregate([
        {
            $group:{"_id":"$categoria", "total": { "$sum": 1 }}
        }
    ]).then((result) =>{
        const data ={};
        result.forEach(x => data[transCategoria(x._id)] = x.total);
        return data;
    }).catch((error)=>{
        console.log('E1 : ',error);
    });
    res.json(total);
});
router.get('/categoria/:id', async(req, res) =>{
    const catId = parseInt(req.params.id);
    if(catId){
        const total = await Runner.aggregate([
            {
                $match:{categoria: catId}
            },
            {
                $group:{"_id":"$sexo", "total": { "$sum": 1 }}
            }
        ]).then((result) =>{
            const data ={};
            result.forEach(x => data[transSexo(x._id)] = x.total);
            return data;
        }).catch((error)=>{
            console.log('E2 : ',error);
        });
        res.json(total);
    }else{
        res.json({});
    }
});
router.get('/totalsexos', async(req, res)=>{
    const total = await Runner.aggregate([
        {
            $group:{"_id":"$sexo", "total": { "$sum": 1 }}
        }
    ]).then((result) =>{
        const data ={};
        result.forEach(x => data[transSexo(x._id)] = x.total);
        return data;
    }).catch((error)=>{
        console.log('E1 : ',error);
    });
    res.json(total);
});
router.get('/camisetas', async(req, res)=>{
    const total = await Runner.aggregate([
        {
            $match:{camiseta: true}
        },
        {
            $group:{"_id":"$talla", "total": { "$sum": 1 }}
        }
    ]).then((result) =>{
        const data ={};
        result.forEach(x => data[x._id] = x.total);
        return data;
    }).catch((error)=>{
        console.log('E2 : ',error);
    });
    res.json(total);
});
router.get('/recaudacion', async(req, res)=>{
    const total = await Runner.aggregate([
        {
            $group:{"_id":null, "total": { "$sum": "$pago" }}
        }
    ]).then((result) =>{
        return {'total':result[0].total};
    }).catch((error)=>{
        console.log('E2 : ',error);
    });
    res.json(total);
});

module.exports = router;