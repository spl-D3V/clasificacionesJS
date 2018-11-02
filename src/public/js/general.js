window.onload = function(){
    const socket = io();
    // obteniendo elementos DOM
    const general = document.getElementById("tablaGeneral");
    const msgAlerta = document.getElementById("mensajeAlerta");
    // eventos
    socket.emit('newconnection', {user: "nuevo"});
    socket.on('new-runner', (data)=>{
        if(data.runner && data.runner.categoria > 4){
            rellenarTabla(data.runner);
        }
    });
    socket.on('runner-corregido', (data) => {
        if(data.refrescar){
            msgAlerta.hidden = false;
        }
    });
    socket.on('load-old-msg',(data)=>{
        const runners = data.list;
        const listaGeneral = runners.filter(r => r.categoria > 4);
        for(let i = 0; i < listaGeneral.length; i++){
            rellenarTabla(listaGeneral[i], i+1);
        }
    });
    function rellenarTabla(data, posicion=false){
        let puesto = 0;
        if(posicion){
            puesto = posicion;
        }else{
            puesto = (general.getElementsByTagName("tr")).length;
        }
        let row = general.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        cell1.innerHTML = puesto;
        cell2.innerHTML = data.dorsal;
        cell3.innerHTML = data.nombre;
        cell4.innerHTML = data.apellidos;
    }
};