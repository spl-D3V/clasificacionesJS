window.onload = function(){
    const socket = io();
    // obteniendo elementos DOM
    const chupFem = document.getElementById("chupetinesfem");
    const prebenFem = document.getElementById("prebenjaminfem");
    const benjFem = document.getElementById("benjaminfem");
    const alevFem = document.getElementById("alevinfem");
    const infFem = document.getElementById("infantilfem");
    const cadFem = document.getElementById("cadetefem");
    const junFem = document.getElementById("juniorfem");
    const senFem = document.getElementById("seniorfem");
    const vetFem = document.getElementById("veteranofem");
    const chupMas = document.getElementById("chupetinesmas");
    const prebenMas = document.getElementById("prebenjaminmas");
    const benjMas = document.getElementById("benjaminmas");
    const alevMas = document.getElementById("alevinmas");
    const infMas = document.getElementById("infantilmas");
    const cadMas = document.getElementById("cadetemas");
    const junMas = document.getElementById("juniormas");
    const senMas = document.getElementById("seniormas");
    const vetMas = document.getElementById("veteranomas");
    const formSimple = document.getElementById("dorsalSimpleForm");
    const formCorreccion = document.getElementById("dorsalCorreccionForm");
    const idDorsal = document.getElementById("dorsal");
    const idDorsalCorregir = document.getElementById("dorsalCorregir");
    const msgAlerta = document.getElementById("mensajeAlerta");
    // eventos
    formSimple.onsubmit = function(evt){
        evt.preventDefault();
        socket.emit('send-runner', {dorsal:parseInt(idDorsal.value)});
        idDorsal.value = '';
    };
    formCorreccion.onsubmit = function(evt){
        let dorsalCorregir = parseInt(idDorsalCorregir.value);
        if(!dorsalCorregir){
            evt.preventDefault();
            idDorsalCorregir.value = '';
        }else{
            socket.emit('corregir-runner', {dorsal:dorsalCorregir});
        }
    }
    socket.emit('newconnection', {user: "nuevo"});
    socket.on('new-runner', (data)=>{
        if(data.runner){
            rellenarTableros(data.runner);
        }
    });
    socket.on('runner-corregido', (data) => {
        if(data.refrescar){
            msgAlerta.hidden = false;
        }
    });
    socket.on('load-old-msg',(data)=>{
        const runners = data.list;
        for(let i = 0; i < runners.length; i++){
            rellenarTableros(runners[i]);
        }
    });
    function rellenarTableros(data){
        let node = document.createElement("li");
        let textnode = document.createTextNode(' '+data.dorsal+' : '+data.nombre+' '+data.apellidos);
        node.appendChild(textnode);
        if(data.sexo === 0){
            switch(data.categoria){
                case 1:
                    prebenFem.appendChild(node);
                    break;
                case 2:
                    benjFem.appendChild(node);
                    break;
                case 3:
                    alevFem.appendChild(node);
                    break;
                case 4:
                    infFem.appendChild(node);
                    break;
                case 5:
                    cadFem.appendChild(node);
                    break;
                case 6:
                    junFem.appendChild(node);
                    break;
                case 7:
                    senFem.appendChild(node);
                    break;
                case 8:
                    vetFem.appendChild(node);
                    break;
                default:
                    break;
            }
        }else{
            switch(data.categoria){
                case 1:
                    prebenMas.appendChild(node);
                    break;
                case 2:
                    benjMas.appendChild(node);
                    break;
                case 3:
                    alevMas.appendChild(node);
                    break;
                case 4:
                    infMas.appendChild(node);
                    break;
                case 5:
                    cadMas.appendChild(node);
                    break;
                case 6:
                    junMas.appendChild(node);
                    break;
                case 7:
                    senMas.appendChild(node);
                    break;
                case 8:
                    vetMas.appendChild(node);
                    break;
                default:
                    break;
            }
        }
        if(data.categoria === 0){
            let node2 = document.createElement("li");
            let textnode2 = document.createTextNode(' '+data.dorsal+' : '+data.nombre+' '+data.apellidos);
            node2.appendChild(textnode2);
            chupFem.appendChild(node2);
            chupMas.appendChild(node);
        }
    }
};