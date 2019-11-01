const pdf = require('html-pdf');
const express = require('express');
const router = express.Router();
const {Runner} = require('../models/Runner');
const {transCategoria, ListaCorredores, transSexoWeb} = require('../helpers/helpers');

router.get('/:categoria/:sexo', async(req, res) => {
    const cat = parseInt(req.params.categoria);
    const sex = parseInt(req.params.sexo);
    const runners = await getRunners(cat, sex);
    GenerarPDF(cat, runners, res, sex);
});

router.get('/:categoria', async(req, res) => {
    const cat = parseInt(req.params.categoria);
    const runners = await getRunners(cat);
    GenerarPDF(cat, runners, res);
});

async function getRunners(cat, sex = NaN){
    if (!isNaN(cat)){
        const criteria = {meta: true};
        criteria['categoria'] = cat;
        if (!isNaN(sex)){
            criteria['sexo'] = sex;
        }
        return await Runner.find(criteria, null, {sort: 'llegada'});
    } else {
        return [];
    }
};

function GenerarPDF(cat, runners, response, s = ""){
    let lista = "";
    const categoria = transCategoria(cat);
    const sexo = transSexoWeb(s);
    for(r of runners){
        lista += `<li>${r.nombre} ${r.apellidos}, dorsal: ${r.dorsal}</li>`;
    }
    const html = ListaCorredores(categoria+" "+sexo, lista);
    pdf.create(html, {format:"A4"}).toStream((err, stream) => {
        if (err){
            return response.end(err.stack);
        }
        response.setHeader('Content-type', 'application/pdf');
        response.setHeader('Content-disposition', 'attachment; filename='+categoria+sexo+'.pdf');
        stream.pipe(response);
    });
}

module.exports = router;