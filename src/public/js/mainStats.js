function Colores(){
    return [
        '#11A579',
        '#7F3C8D',
        '#3969AC',
        '#F2B701',
        '#E73F74',
        '#80BA5A',
        '#E68310',
        '#008695',
        '#CF1C90',
        '#f97b72',
        '#4b4b8f',
        '#A5AA99'];
}

async function GetData(url){
    const result = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/statistics/"+url, true);
        xhr.responseType = "json";
        xhr.onload = function(){
            resolve(xhr.response);
        };
        xhr.onerror = function(){
            reject({'x':[], 'y':[]});
        };
        xhr.send(null);
    }).then((res) =>{return res;}).catch((err) =>{console.log(err);});
    if(result){
        const data = {'x':[], 'y':[]};
        let cleanResult = undefined;
        if (result.constructor === Array){
            cleanResult = result.slice();
        }else{
            cleanResult = Object.entries(result);
        }
        for (let [k, v] of cleanResult){
            data['x'].push(k);
            data['y'].push(v);
        }
        return data;
    }
    return {'x':[], 'y':[]};
}

function createPieChart(plot, dataApi){
    const ctx = document.getElementById(plot).getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data:{
            datasets: [{
                data: dataApi['y'],
                backgroundColor: Colores(),
                label: plot
            }],
            labels: dataApi['x']
        },
        options: {
            responsive: true
        }
    });
}

window.addEventListener("load", function () {

    const btnCategorias = this.document.getElementById("btnCategorias");
    const btnSexos = this.document.getElementById("btnSexos");
    const btnMascotas = this.document.getElementById("btnMascotas");
    const btnChupetin = this.document.getElementById("btnChupetin");
    const btnPrebenjamin = this.document.getElementById("btnPrebenjamin");
    const btnBenjamin = this.document.getElementById("btnBenjamin");
    const btnAlevin = this.document.getElementById("btnAlevin");
    const btnInfantil = this.document.getElementById("btnInfantil");
    const btnCadete = this.document.getElementById("btnCadete");
    const btnJunior = this.document.getElementById("btnJunior");
    const btnSenior = this.document.getElementById("btnSenior");
    const btnVeterano = this.document.getElementById("btnVeterano");

    btnCategorias.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("totalcategorias");
        createPieChart("cCategorias", data);
    });
    btnSexos.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("totalsexos");
        createPieChart("cSexos", data);
    });
    btnMascotas.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("categoria/9");
        createPieChart("cMascotas", data);
    });
    btnChupetin.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("categoria/0");
        console.log(data);
        createPieChart("cChupetin", data);
    });
    btnPrebenjamin.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("categoria/1");
        createPieChart("cPrebenjamin", data);
    });
    btnBenjamin.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("categoria/2");
        createPieChart("cBenjamin", data);
    });
    btnAlevin.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("categoria/3");
        createPieChart("cAlevin", data);
    });
    btnInfantil.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("categoria/4");
        createPieChart("cInfantil", data);
    });
    btnCadete.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("categoria/5");
        createPieChart("cCadete", data);
    });
    btnJunior.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("categoria/6");
        createPieChart("cJunior", data);
    });
    btnSenior.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("categoria/7");
        createPieChart("cSenior", data);
    });
    btnVeterano.addEventListener("click", async function(evt){
        evt.preventDefault();
        const data = await GetData("categoria/8");
        createPieChart("cVeterano", data);
    });
});
