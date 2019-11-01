const io = require('socket.io');
const {Runner} = require('../models/Runner');

function updateRunner(ndorsal, llegadameta){
    const body = {meta: llegadameta, llegada: llegadameta ? Date.now() : null};
    // si ha llegado a la meta, el corredor tiene estado inicial meta=false
    // si corregimos un corredor, el corredor tiene estado inicial meta=true
    const criteria = {dorsal: ndorsal, meta: !llegadameta}; 
    return [criteria, body];
}

module.exports = function(server) {
    var sockets = io.listen(server);
    sockets.on('connection', async function(socket) {
        socket.on('send-runner', async (data, cb) => {
            let iddorsal = parseInt(data.dorsal);
            if(!isNaN(iddorsal)){
                let criteriaUpdate = updateRunner(iddorsal, true);
                let runner = await Runner.findOneAndUpdate(criteriaUpdate[0], criteriaUpdate[1], {new: true});
                if(runner){
                    sockets.emit('new-runner', {runner});
                }
            }
        });
        socket.on('corregir-runner', async (data, cb) => {
            let iddorsal = parseInt(data.dorsal);
            if(!isNaN(iddorsal)){
                let criteriaUpdate = updateRunner(iddorsal, false);
                let runner = await Runner.findOneAndUpdate(criteriaUpdate[0], criteriaUpdate[1]);
                if(runner){
                    sockets.emit('runner-corregido', {refrescar:true});
                }
            }
        });
        socket.on('newconnection', async function(){
            const criteria = {meta: true};
            const runners = await Runner.find(criteria, null, {sort: 'llegada'});
            socket.emit('load-old-msg', {list: runners});
        });
    });
}