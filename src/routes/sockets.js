const io = require('socket.io');
const {Runner} = require('../models/Runner');

module.exports = function(server) {
    var sockets = io.listen(server);
    sockets.on('connection', async function(socket) {
        socket.on('send-runner', async (data, cb) => {
            let iddorsal = parseInt(data.dorsal);
            if(iddorsal){
                const body = {meta: true, llegada: Date.now()};
                const dorsalId = {dorsal: iddorsal, meta: false};
                let runner = await Runner.findOneAndUpdate(dorsalId, body, {new: true});
                if(runner){
                    sockets.emit('new-runner', {runner});
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