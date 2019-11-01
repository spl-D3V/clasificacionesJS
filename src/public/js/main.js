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
    const toastContainer = document.getElementById("ultimasEntradas");
    const btnPdf = document.getElementById("btnPdf");
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
            addToast(data.runner);
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
        const node = document.createElement("li");
        node.innerText = ' '+data.dorsal+' : '+data.nombre+' '+data.apellidos;
        if(data.sexo === 1){
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
            const node2 = document.createElement("li");
            node2.innerText = ' '+data.dorsal+' : '+data.nombre+' '+data.apellidos;
            chupFem.appendChild(node2);
            chupMas.appendChild(node);
        }
    }

    function addToast(data){
        const div = document.createElement("div");
        div.className = "infoAdd"
        div.id = data.llegada.toString();
        div.innerHTML = `<div class="toast" data-autohide="false"><div class="toast-header">
                            <strong class="btn btn-success mr-auto">${data.dorsal}</strong></div>
                            <div class="toast-body">${data.nombre} ${data.apellidos}</div></div>`;
        toastContainer.appendChild(div);
        const nRunners = document.getElementsByClassName("infoAdd");
        if (nRunners.length > 5){
            const ids = [];
            for (t of nRunners){
                ids.push(t.id);
            }
            const id = ids.reverse().pop();
            const toastToRemove = document.getElementById(id);
            toastContainer.removeChild(toastToRemove);
        }
        $('.toast').toast("show");
    };

    btnPdf.addEventListener('click', function(evt){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/listados/8/1", true);
        xhr.onload = function(){
            resolve(xhr.response);
        };
        xhr.onerror = function(){
            reject({'x':[], 'y':[]});
        };
        xhr.send(null);
    });
};