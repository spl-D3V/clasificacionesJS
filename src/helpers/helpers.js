function category(anio){
    if (anio === "MASCOTA"){
        return 9;
    }
    anio = parseInt(anio);
    if (anio > 2013){
        return 0; // chu
    }else if(anio > 2011){
        return 1; // pre
    }else if(anio > 2009){
        return 2; // ben
    }else if(anio > 2007){
        return 3; // ale 
    }else if(anio > 2005){
        return 4; // inf
    }else if(anio > 2003){
        return 5; // cad
    }else if(anio > 2000){
        return 6; // jun
    }else if(anio > 1981){
        return 7; // sen
    }else if(anio < 1982){
        return 8; // vet
    }else{
        return 10;
    }
};

function transCategoria(catid){
    let label = "";
    switch (catid) {
        case 0:
            label = "Chupetines";
            break;
        case 1:
            label = "Prebenjamin";
            break;
        case 2:
            label = "Benjamin";
            break;
        case 3:
            label = "Alevin";
            break;
        case 4:
            label = "Infantil";
            break;
        case 5:
            label = "Cadete";
            break;
        case 6:
            label = "Junior";
            break;
        case 7:
            label = "Senior";
            break;
        case 8:
            label = "Veterano";
            break;
        case 9:
            label = "Mascota";
            break;
        default:
            label = "Desconocido";
            break;
    }
    return label;
};

function transSexo(catid){
    let label = "";
    switch (catid) {
        case 0:
            label = "Hombre";
            break;
        case 1:
            label = "Mujer";
            break;
        default:
            label = "Desconocido";
            break;
    }
    return label;
};

function transSexoWeb(catid){
    let label = "";
    switch (catid) {
        case 0:
            label = "Masculino";
            break;
        case 1:
            label = "Femenino";
            break;
        default:
            break;
    }
    return label;
};

function ListaCorredores(cat, lista){
    const html = `<style>ol li {margin-bottom: 10px;}</style>
        <div id="pageHeader" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        <p style="color: #666; margin: 0; padding-top: 12px; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .85em">
        ${cat}
        </p>
        </div>
        <div><ol style="color: #000; width: 70%; text-align: left; font-family: sans-serif; font-size: 0.7em; float: left;">${lista}</ol></div>
        <div id="pageFooter" style="border-top: 1px solid #ddd; padding-top: 5px;">
            <p style="color: #666; width: 70%; margin: 0; padding-bottom: 5px; text-align: let; font-family: sans-serif; font-size: .65em; float: left;">VI Carrera contra el cáncer, Azuaga 2019</p>
            <p style="color: #666; margin: 0; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .65em">Página {{page}} de {{pages}}</p>
        </div>`;
  return html;
};

function SexoToId(sexo){
    let id = -1;
    switch (sexo) {
        case "HOMBRE":
            id = 0;
            break;
        case "MUJER":
            id = 1;
            break;
        default:
            break;
    }
    return id;
}

module.exports = {category, transCategoria, transSexo, transSexoWeb, ListaCorredores, SexoToId};