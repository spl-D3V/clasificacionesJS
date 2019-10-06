window.addEventListener("load", function () {
    const formCorredor = this.document.getElementById("formCorredor");
    const btnUpdate = this.document.getElementById("btnUpdate");
    const btnBorrar = this.document.getElementById("btnBorrar");
    const dorsal = this.document.getElementById("dorsal");
    const camiseta = this.document.getElementById("camiseta");
    const talla = this.document.getElementById("talla");
    console.log('hola');
    formCorredor.addEventListener('submit', function(evt){
        evt.preventDefault();
    });
    camiseta.addEventListener('change', function(evt){
        talla.hidden = !camiseta.checked;
        talla.required = camiseta.checked;
    });
    btnUpdate.addEventListener('click', function(evt){
        if(formCorredor.reportValidity()){
            const xhr = new XMLHttpRequest();
            const fd = new FormData(formCorredor);
            xhr.open("PUT", "/inscripcion/runner/"+dorsal.value);
            xhr.send(fd);
        }
    });
    btnBorrar.addEventListener('click', function(evt){
        if(formCorredor.reportValidity()){
            const xhr = new XMLHttpRequest();
            xhr.addEventListener('readystatechange', function(){
                if(xhr.status === 301){
                    console.log(xhr.readyState);
                    window.location = "/inscripcion"
                }
            });
            xhr.open("DELETE", "/inscripcion/runner/"+dorsal.value, true);
            xhr.send(null);
        }
    });
});